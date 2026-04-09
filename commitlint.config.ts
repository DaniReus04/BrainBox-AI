module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // nova funcionalidade
        "fix", // correção de bug
        "docs", // documentação
        "style", // formatação, ponto e vírgula, etc
        "refactor", // refatoração de código
        "perf", // melhoria de performance
        "test", // adição de testes
        "chore", // tarefas de manutenção
        "ci", // mudanças em CI/CD
        "build", // mudanças no sistema de build
        "revert", // reverter commit anterior
      ],
    ],
    "scope-enum": [
      2,
      "always",
      [
        "app", // aplicação principal
        "components", // componentes React
        "pages", // páginas
        "utils", // utilitários
        "hooks", // custom hooks
        "store", // estado global
        "api", // integração com API
        "config", // configurações
        "tests", // testes
        "deps", // dependências
        "ci", // CI/CD
        "docs", // documentação
      ],
    ],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "header-max-length": [2, "always", 200],
    "body-max-line-length": [2, "always", 200],
    "footer-max-line-length": [2, "always", 200],
  },
};
