import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

* {
    box-sizing: border-box;
}

#root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
`;
