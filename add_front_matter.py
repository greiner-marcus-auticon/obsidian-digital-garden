import os
import sys

def add_front_matter(file_path):
    try:
        if not os.path.isfile(file_path):
            print(f"File {file_path} does not exist.")
            return False

        file_name = os.path.basename(file_path)
        title, ext = os.path.splitext(file_name)

        if ext.lower() != ".md" or "_notes/Public" not in file_path.replace("\\", "/"):
            print(f"Skipping {file_path} because it's not a Markdown file in the _notes/Public directory.")
            return False

        front_matter = f"---\ntitle: {title}\nfeed: show\n---\n\n"

        with open(file_path, "r+", encoding="utf-8") as f:
            content = f.read()
            if not content.startswith("---\ntitle: "):  # Avoid adding front matter if it already exists
                f.seek(0)
                f.write(front_matter + content)
                print(f"Successfully added front matter to {file_path}.")
            else:
                print(f"Skipping {file_path} because it already has front matter.")
        return True

    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
        return False

def main():
    try:
        # Read the list of added or modified files from the command line arguments
        markdown_files = sys.argv[1:]

        if not markdown_files:
            print("No Markdown files were added or modified in the _notes/Public folder in the last commit.")
            return

        # Create the temporary file path in the repository root
        repo_root = os.path.dirname(os.path.abspath(__file__))
        txt_file_path = os.path.join(repo_root, 'markdown_files.txt')

        with open(txt_file_path, 'w', encoding='utf-8') as f:
            for file_path in markdown_files:
                file_path = os.path.normpath(file_path)
                if add_front_matter(file_path):
                    f.write(f"{file_path}\n")

    except Exception as e:
        print(f"Error in main: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
