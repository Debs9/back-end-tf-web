CREATE TABLE Administrador 
( 
 ID INT PRIMARY KEY,  
 nome CHAR(n),  
 email INT,  
 senha CHAR(n),  
 CHECK (senha = 'undefined'),
 UNIQUE (senha)
); 

CREATE TABLE Serviços 
( 
 ID INT PRIMARY KEY,  
 preço INT,  
 nome INT,  
 descrição INT,  
); 
