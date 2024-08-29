CREATE TABLE TB_USUARIO (
    USR_ID INT AUTO_INCREMENT PRIMARY KEY,
    USR_EMAIL VARCHAR(255) NOT NULL,
    USR_SENHA VARCHAR(255) NOT NULL,
    USR_NOME VARCHAR(255) NOT NULL
);

CREATE TABLE TB_PROJETO (
    PRJ_ID INT AUTO_INCREMENT PRIMARY KEY,
    PRJ_USRID INT NOT NULL,
    PRJ_NOME VARCHAR(255) NOT NULL,
    PRJ_DESCRICAO VARCHAR(255),
    PRJ_FONOTATICA VARCHAR(255),
    FOREIGN KEY (PRJ_USRID) REFERENCES TB_USUARIO(USR_ID)
);

CREATE TABLE TB_COMENTARIO (
    COM_ID INT AUTO_INCREMENT PRIMARY KEY,
    COM_USRID INT NOT NULL,
    COM_PRJID INT NOT NULL,
    COM_CONTEUDO VARCHAR(255),
    FOREIGN KEY (COM_USRID) REFERENCES TB_USUARIO(USR_ID),
    FOREIGN KEY (COM_PRJID ) REFERENCES TB_PROJETO(PRJ_ID)
);

CREATE TABLE TB_VOCABULO (
    VOC_ID INT AUTO_INCREMENT PRIMARY KEY,
    VOC_PRJID INT NOT NULL,
    VOC_ROMANIZACAO VARCHAR(255),
    VOC_TRANSCRICAO VARCHAR(255),
    VOC_PRONUNCIA VARCHAR(255),
    FOREIGN KEY (VOC_PRJID) REFERENCES TB_PROJETO(PRJ_ID)
);

CREATE TABLE TB_FONE (
    FON_ID INT AUTO_INCREMENT PRIMARY KEY,
    FON_PRJID INT NOT NULL,
    FON_DESCRICAO VARCHAR(255),
    FOREIGN KEY (FON_PRJID) REFERENCES TB_PROJETO(PRJ_ID)
);

CREATE TABLE TB_EXEMPLO (
    EXE_ID INT AUTO_INCREMENT PRIMARY KEY,
    EXE_PRJID INT NOT NULL,
    EXE_TITULO VARCHAR(255),
    EXE_CORPO VARCHAR(255),
    EXE_GRAVACAO VARCHAR(255),
    FOREIGN KEY (EXE_PRJID) REFERENCES TB_PROJETO(PRJ_ID)
);

CREATE TABLE TB_REGRA (
    REG_ID INT AUTO_INCREMENT PRIMARY KEY,
    REG_PRJID INT NOT NULL,
    REG_TITULO VARCHAR(255),
    REG_CORPO VARCHAR(255),
    FOREIGN KEY (REG_PRJID) REFERENCES TB_PROJETO(PRJ_ID)
);

CREATE TABLE TB_DEFINICAO (
    DEF_ID INT AUTO_INCREMENT PRIMARY KEY,
    DEF_VOCID INT NOT NULL,
    DEF_CLASSE VARCHAR(255),
    DEF_DESCRICAO VARCHAR(255),
    FOREIGN KEY (DEF_VOCID) REFERENCES TB_VOCABULO(VOC_ID)
);