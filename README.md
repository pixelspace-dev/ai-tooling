# ai-tooling

An easy to use implementation of a fast tokenizer

For use with OpenAI models

## main features

- Returns number of tokens used when given text input
- Estimates number of tokens to be used in the AI's response
- Compatible with ALL available OpenAI models

Important Note: Tiktoken does not include special tokens such as [CLS] or [SEP] in its final count (We might need to add this feature, so the users get the exact number of tokens)

### To Do (for the API)

- We need to add the FastAPI code (service)
- We need to add the Dockerfile to create the image for the api
- We need to add the Unit tests
- We need to add the CI/CD pipeline (GitHub Actions)

### To Do (for the Streamlit app)

- We need to add the Streamlit code (service)
- Create account in Streamlit Cloud
- Add the appropiate TOML file with Env Variables

### Useful Commands

To create a git branch:

    ```bash
    git checkout -b <branch-name>
    ```

To push a branch to GitHub:

    ```bash
    git push origin <branch-name>
    ```
