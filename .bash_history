npx create-next-app@latest --ts --use-yarn
# ? What is your project named? » belatura-frontend
# ? Would you like to use ESLint? » Yes
# ? Would you like to use Tailwind CSS? » No
# ? Would you like to use `src/` directory? » No
# ? Would you like to use App Router? (recommended) » Yes
# ? Would you like to customize the default import alias (@/*)? » No

mv ./belatura-frontend/* ./
mv ./belatura-frontend/.* ./
rmdir ./belatura-frontend

yarn add axios
yarn add redux
yarn add react-redux
yarn add @reduxjs/toolkit
yarn add redux-thunk
yarn add -D @types/react-redux
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/free-regular-svg-icons
yarn add @fortawesome/free-brands-svg-icons
yarn add @fortawesome/react-fontawesome
yarn add prettier
yarn add react-copy-to-clipboard
yarn add @types/react-copy-to-clipboard
yarn add react-markdown
