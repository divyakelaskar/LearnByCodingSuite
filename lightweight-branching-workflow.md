- Main branch (or `main/master`) stays stable.
- Each developer creates a branch per feature (or per bug fix) with a meaningful name (`feature/login`, `fix/api-errors`, etc.).
- After completing a task, open a pull request, and the other person reviews it. Then, merge into the main branch.
- If something breaks, you can easily revert that specific branch without affecting other work.

To locally run a different branch from your repository, you need to follow a few simple steps using Git. This will allow you to switch between branches, work on them, and run the project as needed. Here’s how you can do it:

> [!IMPORTANT]  
> Create the branch on remote platform then track it through a locally created branch.

### 1. **Check for Available Branches**
   
   - **To see local branches:**
     ```bash    
     git branch
     ```
     This will list all the branches that you have locally.
   
   - **To see remote branches as well:**
     ```bash
     git branch -a
     ```
     This will list both local and remote branches. Remote branches will be listed as `origin/branch-name`.

### 2. **Fetch Latest Updates **
   If you want to make sure you have the latest branches and updates from the remote repository, run:
   ```bash
   git fetch
   ```
   This will update your local knowledge of the remote repository, pulling down new branches and commits without modifying your working directory.

### 3. **Switch to the Desired Branch**
   Use the `git checkout` or `git switch` command to change to the branch you want to work on or run.

   - **If the branch is remote (you don’t have it locally yet), you can check it out directly like this:**
     ```bash
     git checkout -b branch-name origin/branch-name
     ```
     This command:
     - Creates a local branch named `branch-name`.
     - Tracks the remote branch `origin/branch-name`.
  
> [!IMPORTANT]  
> Keep local and remote branch names same for simplicity.

### 4. **Install Dependencies (If Required)**
   If your project has dependencies (e.g., `npm`, `pip`, etc.), you may need to install them for that branch. Usually, this happens if there are different dependencies in this branch compared to the one you were working on before.

### 5. **Run the Project**
   The process will depend on your specific setup.

### 6. **Making Changes and Committing on Another Branch (can be done with VSCode UI as well)**
   Once you're on the correct branch, you can start making changes to files, add them to staging, and commit them.

   - **Staging changes:**
     ```bash
     git add <file>
     ```
   
   - **Committing changes:**
     ```bash
     git commit -m "Your commit message"
     ```

### 7. **Pushing Changes to Remote (can be done with VSCode UI as well)**
   If you made changes and want to push them to the remote repository, do the following:
   ```bash
   git push origin branch-name
   ```

This process allows you to seamlessly switch between different branches and run or develop on them locally.