# Personal Knowledge Management Garden

Welcome to your Personal Knowledge Management Garden!

This project publishes selected notes from an Obsidian vault on GitHub Pages.

---

<!-- TOC -->

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Using the Repository As Template](#using-the-repository-as-template)
- [Instructions To Use This Repository as a Template](#instructions-to-use-this-repository-as-a-template)
- [Manage Personal Access Token (PAT)](#manage-personal-access-token-pat)
  - [Step 1: Create a Personal Access Token (PAT)](#step-1-create-a-personal-access-token-pat)
  - [Step 2: Add the PAT as a Secret in Your GitHub Repository](#step-2-add-the-pat-as-a-secret-in-your-github-repository)
  - [Update Your GitHub Actions Workflow YAML (if new Secrets Name)](#update-your-github-actions-workflow-yaml-if-new-secrets-name)
- [Add Notes](#add-notes)
  - [Exclude Notes From Being Published](#exclude-notes-from-being-published)
- [Prepare Notes To Be Published](#prepare-notes-to-be-published)
- [Test Locally](#test-locally)
  - [Jekyll](#jekyll)
  - [Docker](#docker)
- [Publish Notes](#publish-notes)
- [Obsidian Graph View](#obsidian-graph-view)
- [Pre-commit Git Hook](#pre-commit-git-hook)
- [Front Matter](#front-matter)
- [GitHub Actions Workflow](#github-actions-workflow)
- [Contributing](#contributing)
- [License](#license)
- [References](#references)

<!-- /TOC -->

---

## Introduction

In May 2024 I started to use [Obsidian](#references) as a note taking app.

I aimed to publish my notes on [GitHub Pages](#references) to share them with others, starting with the [Jekyll Garden Theme](#references).

Having used [Notion](#references) extensively, my notes were structured around the Personal Knowledge Management (PKM) system by [Tiago Forte - building a second brain](#references).

Migrating my Notion notes to Obsidian involved exporting them as HTML files due to issues with Markdown and CSV exports. Additionally, I had to use 7-Zip on Windows 11 to unzip the files properly.

In Obsidian, I utilize plugins like:

- [DataView](#references)
- [MAKE.md](#references)
- [Importer](#references)

Importing HTML files into Obsidian posed issues with asset references, which I plan to address later (see [Issue #10](#references)).

## Features

- **Notes**: Use Obsidian to create and manage notes.
- **Front Matter**: Automatically adds front matter to markdown files.
- **Linting**: Lints markdown files using [markdownlint-cli2](#references).
- **GitHub Actions**: Automates the build and deployment of the Jekyll site to GitHub Pages.
- **Jekyll Integration**: Generates static pages using Jekyll.
- **Docker Support**: Includes Docker configuration for easy development and deployment.

## Getting Started

### Prerequisites

- [Ruby](#references)
- [Bundler](#references)
- [Docker](#references) (optional, for containerized setup)
- [markdownlint-cli2](#references)
- GitHub Token named ACTIONS_PAT (used in repository's GitHub Actions workflow `build-and-deploy-github-pages.yml`)

### Using the Repository As Template

Follow step by step:

1. Start with [instructions to use this repository as a template](#instructions-to-use-this-repository-as-a-template).
2. **IMPORTANT**: [Manage your personal access token on GitHub](#manage-personal-access-token-pat).
3. Clone your repository.

    For example:

    ```bash
    git clone https://github.com/<your-github-username>/<your-github-username>.github.io.git
    cd <your-github-username>.github.io
    ```

4. **IMPORTANT**: Install [Pre-commit Git Hook](#pre-commit-git-hook) to enable the pre-commit hook.
5. **IMPORTANT**: Insert `https://<your-github-username>.github.io` in URL field in `_config.yml`.
6. (Optional) Configure title, description, and other settings in `_config.yml`.
7. [Add Notes](#add-notes).
8. [Prepare notes](#prepare-notes-to-be-published) to be published.
9. (Optional) [Test your site locally](#test-locally).
10. [Publish notes](#publish-notes) on GitHub Pages.

## Instructions To Use This Repository as a Template

1. **Navigate to the [GitHub page](https://github.com/velotist/velotist.github.io)**.
2. **Use the Template**:
   - Click the `Use this template` button located at the top of the repository page.
   - Choose `Create a new repository`.
3. **Create New Repository**:
   - Fill out the form:

     **Repository name**: `<your-github-username>.github.io`

     >Replace `<your-github-username>` with your GitHub username.
   - Finish by clicking `Create repository`.

**Continue with Step 2 of [Using the Repository As Template](#using-the-repository-as-template)**.

## Manage Personal Access Token (PAT)

### Step 1: Create a Personal Access Token (PAT)

1. **Navigate to Your GitHub Account**:
   - Go to your GitHub account.

2. **Access Developer Settings**:
   - In the upper-right corner of any page, click your profile photo, then click **Settings**.
   - In the left sidebar, click **Developer settings**.

3. **Generate a New Token**:
   - In the left sidebar, click **Personal access tokens**.
   - Choose `Tokens (classic)`.
   - Click **Generate new token (classic)**.

4. **Configure the Token**:
   - **Note**: Give your token a descriptive name, such as `ACTIONS_PAT`.
   - **Expiration**: Set an appropriate expiration date. A shorter period is more secure, but you will need to renew it periodically.
   - **Select Scopes**: Check the following scopes:
     - `repo` (for full control of private repositories)
     - `workflow` (for updating GitHub Actions workflows)
     - `admin:org` (if deploying to organizational repositories)
   - Click **Generate token**.

5. **Copy the Token**:
   - Copy the generated token.

      :bell:**You will not be able to see it again**.

### Step 2: Add the PAT as a Secret in Your GitHub Repository

1. **Navigate to Your Repository**:
   - Go to the repository where you want to add the secret.

2. **Access Repository Settings**:
   - Click on the **Settings** tab.

3. **Add a New Secret**:
   - In the left sidebar, click **Secrets and variables** and then click **Actions**.
   - Click **New repository secret**.
   - In the **Name** field, type `ACTIONS_PAT`.
   - In the **Value** field, paste the copied PAT.
   - Click **Add secret**.

### Update Your GitHub Actions Workflow YAML (if new Secrets Name)

Ensure the GitHub Actions workflow file `build-and-deploy-github-pages.yml` references the secret you created.

If you used a different secret name, replace **ACTIONS_PAT** in the workflow file with the name of your secret.

For example, if your secret is named **MY_SECRET_PAT**, update the token field as follows:

```yaml
with:
  token: ${{ secrets.MY_SECRET_PAT }}
```

**Continue with Step 3 of [Using the Repository As Template](#using-the-repository-as-template)**.

## Add Notes

:bell: Avoid having too long markdown file names and extensive folder hierarchies to prevent issues with the site generation.

:bell: Importing notes from another note taking app can be a time-consuming process to fulfill your requirements.
You should check the rules in `.markdownlint.jsonc` before to adjust the linting rules to your needs.

Steps to add an Obsidian vault to be published:

- Open Obsidian and create a vault in the `_notes/Public` directory.
- (Optional) Delete the `Welcome` note in Obsidian.
- Install plugin `MAKE.md` in Obsidian.
- Enable plugin `MAKE.md` in Obsidian.
- Create your notes in Obsidian.

If you want to import notes from another note taking app:

- Install plugin `Importer` in Obsidian.
- Enable plugin `Importer` in Obsidian.
- Import your notes with the `Importer` plugin.
  - Open `Importer` and choose your `File format`.
  - If needed `Choose file` to import.
  - Leave `Output folder` blank to output to vault root.
  - Optionally choose other settings.
    - Click `Import`.

    Assets like pictures etc. are stored in the `Public` directory by default. Linking of assets in the markdown files is not supported yet (see [Issue #10](#references)).
- Edit your notes in Obsidian.

**Continue with Step 6 of [Using the Repository As Template](#using-the-repository-as-template)**.

### Exclude Notes From Being Published

You can hide a note from the feed by changing the front matter of the note.

Here's how:

  ```yaml
  ---
  title: Note Title
  feed: hide # before it was --- feed: show
  ---
  ```

Another way to hide notes from the feed is to move them to the `_notes/Private` directory.

- Create a new directory in the `_notes` directory called `Private` and move the notes you want to hide there.

## Prepare Notes To Be Published

- Add your changes to the repository with the Version Control System of your choice.
- Commit your changes.

  A Python script, executed by the [pre-commit hook](#pre-commit-git-hook), will add [front matter](#front-matter) to the notes in the `_notes/Public` directory and all its sub-directories.

  After that it will lint the markdown files using `markdownlint-cli2`.
  If linting fails, the commit will be aborted.
  You can fix the linting issues manually or by editing the `.markdownlint.jsonc` file to adjust the linting rules to your needs.

  After fixing commit again.

**Continue with Step 7 of [Using the Repository As Template](#using-the-repository-as-template)**.

## Test Locally

### Jekyll

:bell: Ensure you have both installed [Ruby](#references) and [Bundler](#references).

1. Install dependencies:

    ```bash
    bundle install
    ```

2. Run the site locally:

    ```bash
    bundle exec jekyll serve
    ```

  The site will be available at `http://localhost:4000`.

### Docker

:bell: Ensure you have installed [Docker](#references) and docker is running.

1. Run Docker Compose:

    ```bash
    docker-compose up -d
    ```

  The site will be available at `http://localhost:4000`.

**Continue with Step 8 of [Using the Repository As Template](#using-the-repository-as-template)**.

## Publish Notes

1. Push your changes to GitHub.

    :bell: Ensure you have pushed your changes to the `main` or `develop` branch.

2. Your site will be published at `https://<your-github-username>.github.io`.

## Obsidian Graph View

To include the Obsidian Graph View in your site, follow these steps:

- Use paid way [Obsidian Publish](#references)
- Use free [Cosma](#references)

## Pre-commit Git Hook

A pre-commit Git hook `pre-commit.sample` ensures code quality and consistency before commits are made.

1. Copy the script `pre-commit.sample` to your local `.git/hooks` directory.
Rename it as `pre-commit`.
Make sure it is executable.

    For example:

    ```bash
    cp pre-commit.sample .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit # may not be necessary
    ```

    The hook performs the following tasks:

    - Tries to locate the Python executable on your system.
    - Changes to the repository root.
    - Checks for new or modified markdown files in the `_notes/Public` directory and its sub-directories.
    - Executes the Python script to add necessary [front matter](#front-matter) to these files.
    - Tries to locate the [markdownlint-cli2](#references) executable on your system.
    - Lints the markdown files using `markdownlint-cli2`.

**Continue with Step 4 of [Using the Repository As Template](#using-the-repository-as-template)**.

## Front Matter

A Python script is included to automate certain tasks, such as adding front matter to markdown files.

The script ensures that all markdown files in the `_notes/Public` directory have the necessary front matter.
Necessary front matter includes the `title` and `feed` fields.

It is automatically executed by the pre-commit Git hook.

To use the script manually:

1. Run the script with the list of added or modified markdown files as arguments:

    ```bash
    python add_front_matter.py _notes/Public/your_note.md _notes/Public/another_note.md
    ```

The script checks if the file already has front matter and adds it if necessary.

It also logs the process for each file.

## GitHub Actions Workflow

This repository uses a GitHub Actions workflow to automate the build and deployment of the Jekyll site to GitHub Pages upon a push to the `main` and `develop` branch or by manual trigger.

The workflow consists of the following key steps:

- **Permissions**: Sets `GITHUB_TOKEN` to read contents, write pages, and generate ID tokens.
- **Concurrency**: Ensures only one deployment is processed at a time.
- **Build Job**:
  - Checks out the repository.
  - Sets up Ruby and Bundler.
  - Installs dependencies and builds the site.
  - Uploads the build artifact.
- **Deploy Job**: Deploys the site to GitHub Pages using the uploaded artifact.

## Contributing

Contributions are welcome! Follow these steps:

1. Clone or fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
See the [LICENSE](./LICENSE) file for details.

## References

- [Jekyll Garden Theme](https://github.com/Jekyll-Garden/jekyll-garden.github.io)
- [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)
- [Ruby](https://www.ruby-lang.org/en/)
- [Bundler](https://bundler.io/)
- [Jekyll](https://jekyllrb.com/)
- [Obsidian](https://obsidian.md/)
- [Obsidian Publish](https://obsidian.md/publish)
- [Notion](https://www.notion.so/)
- [GitHub Pages](https://pages.github.com/)
- [Docker](https://www.docker.com/)
- [Front Matter](https://jekyllrb.com/docs/front-matter/)
- [Liquid](https://shopify.github.io/liquid/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Tiago Forte - building a second brain](https://www.buildingasecondbrain.com/)
- [DataView](https://blacksmithgu.github.io/obsidian-dataview/)
- [MAKE.md](https://www.make.md/)
- [Importer](https://github.com/obsidianmd/obsidian-importer)
- [Cosma](https://github.com/graphlab-fr/cosma)
- [Personal Knowledge Management Garden](https://github.com/velotist/velotist.github.io)
- [Issue #10](https://github.com/velotist/velotist.github.io/issues/10)
