interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: '', // e-mail verificado e de domínio próprio aqui
      name: 'GoBarber - Amanda Bezerra',
    },
  },
} as IMailConfig;
