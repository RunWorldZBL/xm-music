#!/bin/bash
DATE="2023-06-15T14:00:00+0800"
GIT_COMMITTER_DATE="$DATE" git commit --amend --date="$DATE" --no-edit
git push --force-with-lease origin main
