declare module 'faker-br' {
    export const cpf: {
      generate: () => string;
      format: (cpf: string) => string;
      strip: (cpf: string) => string;
      isValid: (cpf: string) => boolean;
    };
  
    
  }
  