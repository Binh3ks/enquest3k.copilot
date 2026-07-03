# Custom Command: /agent-finish

## Description
Ket thuc task, chay quality gate va cap nhat he thong memory tu dong.

## Instructions
When this command is run, you MUST execute these steps:
1. Remind the user to run `bash production_kit/tools/code_quality_gate.sh` if applicable to the task.
2. Update `.ai/tasks/DONE.md` by moving the completed task from `.ai/tasks/ACTIVE.md` into it.
3. Update `.ai/memory/CURRENT.md` with the latest system state.
4. Prompt the user with a recommended clear, conventional commit message based on the work done.
