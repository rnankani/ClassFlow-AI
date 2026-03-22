# n8n AI Builder Prompts for ClassFlow

## Credentials to create first
- **Supabase**: URL `https://wmnhvntpjoivwlefojyt.supabase.co`, Service Role Key
- **HTTP Header Auth** (for Featherless AI): Name `Authorization`, Value `Bearer rc_72fb54b80ed8573b7aad737896ace1df89bed402516eb30600684119a19749ec`
- **Google Calendar OAuth2**
- **Gmail OAuth2**

---

## Workflow 1: AI Enrichment Pipeline

```
When triggered every 30 minutes, query my Supabase "assignments" table for rows where "is_enriched" is false and "description" is not null (limit 20). Split into individual items. For each one, check if the description length is greater than 30 characters. If yes, make a POST request to https://api.featherless.ai/v1/chat/completions with my Featherless API HTTP Header Auth credential. The JSON body should be: model "moonshotai/Kimi-K2.5", temperature 0.5, messages array with a system message saying "You are a student assistant. Analyze this assignment and return valid JSON: {\"key_topics\":[],\"estimated_hours\":0,\"difficulty\":\"easy|medium|hard\",\"study_tips\":[],\"breakdown_steps\":[]}" and a user message containing the assignment's title, work_type, and description. On success, parse the AI response from choices[0].message.content as JSON, then update the same assignment row in Supabase setting is_enriched to true, ai_enrichment to the parsed JSON, and enrichment_error to null. On error, update the assignment row setting enrichment_error to the error message.
```

---

## Workflow 2: Assignment Email Notifications

```
When a new row is inserted into my Supabase "assignments" table, look up the user_id from the new row in the "user_profiles" table to get their email, full_name, and email_reminders_enabled flag. If email_reminders_enabled is true, query the "assignments" table for all rows where user_id matches, submission_state is in (NEW, CREATED, RECLAIMED_BY_STUDENT), and due_date is within the next 3 days, ordered by due_date ascending. Also join with the "courses" table to get the course name. Then use a Code node to build an HTML email body: greet the user by first name, mention the new assignment title, list all upcoming assignments in an HTML table with columns for title (linked to alternate_link), course name, and formatted due date. Send this email using Gmail to the user's email address with subject "New assignment: {title}". On success, insert a row into "email_logs" with user_id, email_type "assignment_notification", status "sent". On failure, insert into "email_logs" with status "failed" and the error message.
```

---

## Workflow 3: Calendar Sync

```
When a row is inserted or updated in my Supabase "assignments" table, get the user_id from the changed row. Look up the user in "user_profiles" and check if calendar_sync_enabled is true. If yes, query the "assignments" table for that user's rows where submission_state is in (NEW, CREATED, RECLAIMED_BY_STUDENT) and due_date is not null and is in the future. Join with "courses" to get course names. Split into individual items. For each assignment, check if calendar_event_id is not empty. If it has a calendar_event_id, update the existing Google Calendar event on the primary calendar with summary "[CourseName] AssignmentTitle", description from the assignment description plus the alternate_link, start time as the due_date, end time as due_date plus 1 hour, and popup reminders at 1 hour and 24 hours before. If calendar_event_id is empty, create a new Google Calendar event with the same details. After creating or updating, update the assignment row in Supabase setting calendar_event_id to the event ID (for new events) and calendar_synced_at to now.
```

---

## Workflow 4: Auto Classroom Sync

```
Create a workflow with two triggers: a Schedule trigger that runs every 10 minutes, and a Webhook trigger for manual runs. Both lead to the same flow. First, query all rows from my Supabase "google_tokens" table to get all users with their access_token, refresh_token, and user_id. Split into individual users. For each user, make a GET request to https://classroom.googleapis.com/v1/courses?studentId=me&courseStates=ACTIVE with Authorization header "Bearer {access_token}". On error, log to "automation_logs" table with workflow_name "classroom_sync", status "failed", and the error details, then continue to the next user. On success, split the courses array. For each course, do two things in parallel: First, normalize the course data in a Code node mapping id to google_course_id, name, section, descriptionHeading to description, courseState to course_state, alternateLink to alternate_link, and adding user_id and synced_at as now. Then upsert into the "courses" table on conflict of user_id and google_course_id. Second, make a GET request to https://classroom.googleapis.com/v1/courses/{courseId}/courseWork?orderBy=dueDate%20asc with the same auth header. Split the courseWork array. For each coursework item, make another GET request to https://classroom.googleapis.com/v1/courses/{courseId}/courseWork/{workId}/studentSubmissions?userId=me to get the submission state. In a Code node, normalize the data: parse dueDate (year, month, day) and dueTime (hours, minutes) into an ISO date string, map the fields to match the assignments table columns (google_coursework_id, title, description, due_date, max_points, state, submission_state from the first studentSubmission's state defaulting to NEW, alternate_link, work_type), and add user_id and synced_at. Upsert into the "assignments" table on conflict of user_id and google_coursework_id. After all users are processed, insert a row into "automation_logs" with workflow_name "classroom_sync", status "completed", and details containing the count of users processed.
```
