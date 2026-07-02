-- Consultas de referência (movidas de actions.tsx)

SELECT nom_cliente, cod_cliente, bai_cliente FROM cliente WHERE uf_cliente = 'MG';

SELECT cod_cliente, dat_locacao, dat_locacao + INTERVAL '3 DAY' AS "Previsao Entrega" FROM locacao;

SELECT nom_empregado, val_salario FROM empregado WHERE val_salario < val_comissao;

SELECT nom_empregado, val_salario FROM empregado WHERE val_salario BETWEEN 1100 AND 1500;

SELECT cod_empregado, nom_empregado, cod_gerente FROM empregado WHERE cod_gerente IN (7566, 7788, 7902);
