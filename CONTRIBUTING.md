# Contributing to ADAPT Lab Simulations

Thank you for your interest in contributing to ADAPT Lab Simulations! We welcome contributions from the community and appreciate your help in making this project better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/ADAPT-Lab-Simulations.git
   cd ADAPT-Lab-Simulations
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Start the development server**:
   ```bash
   pnpm dev
   ```

## How to Contribute

There are many ways to contribute to this project:

- **Fix bugs**: Check the [issue tracker](https://github.com/nik-kale/ADAPT-Lab-Simulations/issues) for bugs to fix
- **Add features**: Implement new functionality or improve existing features
- **Improve documentation**: Help make our docs clearer and more comprehensive
- **Write tests**: Increase code coverage and reliability
- **Review pull requests**: Provide feedback on open PRs
- **Report bugs**: Create detailed bug reports
- **Suggest features**: Propose new ideas for the project

## Development Workflow

1. **Choose an issue** to work on or create a new one
2. **Comment on the issue** to let others know you're working on it
3. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/issue-number-description
   ```
4. **Make your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Commit your changes** with clear, descriptive messages
7. **Push to your fork**:
   ```bash
   git push origin feature/issue-number-description
   ```
8. **Open a pull request** against the `main` branch

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode and fix all type errors
- Avoid using `any` type unless absolutely necessary
- Define proper interfaces and types for component props

### React Components

- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Use meaningful component and variable names

### Styling

- Use Tailwind CSS utility classes for styling
- Follow the existing design system and color palette
- Ensure responsive design for all screen sizes
- Test in both light and dark modes

### File Organization

- Place components in the `components/` directory
- Use the `ui/` subdirectory for reusable UI primitives
- Keep utility functions in `lib/utils.ts`
- Follow the existing file naming conventions (kebab-case)

### Code Quality

- Write clean, readable, and maintainable code
- Add comments for complex logic
- Remove console.logs before committing
- Use ESLint to check code quality:
  ```bash
  pnpm lint
  ```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates, etc.

### Examples

```bash
feat(samples): add filter by date range

fix(calibration): resolve validation error on step 3

docs(readme): update installation instructions

refactor(components): extract common modal logic
```

## Pull Request Process

1. **Update documentation** if you've changed functionality
2. **Add tests** for new features or bug fixes
3. **Ensure all tests pass** and the build succeeds:
   ```bash
   pnpm build
   ```
4. **Update the README** if needed
5. **Fill out the PR template** completely
6. **Request review** from maintainers
7. **Address feedback** promptly and professionally
8. **Squash commits** if requested before merging

### PR Checklist

- [ ] Code follows the project's coding standards
- [ ] Changes have been tested thoroughly
- [ ] Documentation has been updated
- [ ] Commit messages follow the conventional commits format
- [ ] No merge conflicts with the main branch
- [ ] All CI checks pass

## Reporting Bugs

When reporting bugs, please use the [bug report template](./.github/ISSUE_TEMPLATE/bug_report.md) and include:

- **Clear title**: Summarize the issue concisely
- **Description**: Detailed explanation of the problem
- **Steps to reproduce**: Numbered steps to recreate the issue
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Browser, OS, Node version, etc.
- **Additional context**: Any other relevant information

## Suggesting Features

We welcome feature suggestions! Please use the [feature request template](./.github/ISSUE_TEMPLATE/feature_request.md) and include:

- **Clear title**: Summarize the feature request
- **Problem statement**: What problem does this solve?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other approaches you've thought about
- **Additional context**: Mockups, examples, or references

## Questions?

If you have questions about contributing:

- Check the [README](./README.md) first
- Browse existing [issues](https://github.com/nik-kale/ADAPT-Lab-Simulations/issues)
- Start a [discussion](https://github.com/nik-kale/ADAPT-Lab-Simulations/discussions)
- Reach out to the maintainers

## Recognition

Contributors will be recognized in our README and release notes. We appreciate every contribution, no matter how small!

---

Thank you for contributing to ADAPT Lab Simulations!
