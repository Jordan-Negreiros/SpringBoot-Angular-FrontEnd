export class AppConstants {

  public static get baseServidor(): string { return "http://localhost:8080/" }

  public static get baseUrlPath(): string {
    return this.baseServidor + "projetoapirest/";
  }

  public static get baseLogin(): string { return this.baseUrlPath + "login" }

  public static get baseUrl(): string { return this.baseUrlPath + "usuario/" }

  public static get baseProfissao(): string { return this.baseUrlPath + "profissao/" }
}
