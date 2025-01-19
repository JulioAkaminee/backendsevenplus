-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/01/2025 às 23:56
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sevenplusdb`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`id`, `nome`) VALUES
(1, 'Ação'),
(9, 'Animação'),
(4, 'Aventura'),
(2, 'Comédia'),
(11, 'Documentário'),
(3, 'Drama'),
(10, 'Fantasia'),
(5, 'Ficção Científica'),
(14, 'História'),
(8, 'Mistério'),
(15, 'Musical'),
(12, 'Policial'),
(6, 'Romance'),
(7, 'Terror'),
(13, 'Thriller');

-- --------------------------------------------------------

--
-- Estrutura para tabela `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descricao` text DEFAULT NULL,
  `url_video` varchar(255) NOT NULL,
  `capa` varchar(255) DEFAULT NULL,
  `data_lancamento` date DEFAULT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `movies`
--

INSERT INTO `movies` (`id`, `titulo`, `descricao`, `url_video`, `capa`, `data_lancamento`, `data_criacao`, `category_id`) VALUES
(1, 'Vingadores: Guerra Infinita', 'Os heróis se unem para combater Thanos e salvar o universo.', 'https://www.youtube.com/watch?v=6ZfuNTqbHE8', 'https://cdn.awsli.com.br/2500x2500/1610/1610163/produto/177685204/poster-os-vingadores-guerra-infinita-a-7a2bd6fd.jpg', '2018-04-27', '2024-12-01 00:44:53', 5),
(2, 'O Rei Leão', 'O jovem Simba precisa enfrentar seu destino como o rei da savana.', 'https://www.youtube.com/watch?v=7TavVZMewpY', 'https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2019/08/28/1566998595613.jpg', '1994-06-15', '2024-12-01 00:44:53', 2),
(3, 'Matrix', 'Um programador descobre que a realidade é uma ilusão criada por máquinas.', 'https://www.youtube.com/watch?v=vKQi3bBA1y8', 'https://i.pinimg.com/originals/c3/8d/09/c38d09658a348f3b6101e9eff348b706.jpg', '1999-03-31', '2024-12-01 00:44:53', 5),
(4, 'Jurassic Park', 'Cientistas criam um parque com dinossauros vivos, mas as coisas fogem do controle.', 'https://www.youtube.com/watch?v=Crz8tOoXKpA', 'https://i.pinimg.com/564x/b4/dc/9e/b4dc9e601f9a3e2427f113a89db9d282.jpg', '1993-06-11', '2024-12-01 00:44:53', 5),
(5, 'O Senhor dos Anéis: A Sociedade do Anel', 'Frodo parte para destruir o Anel do Poder e salvar a Terra-média.', 'https://www.youtube.com/watch?v=Pki6jbPbP7A', 'https://upload.wikimedia.org/wikipedia/pt/thumb/3/38/Lord_of_the_Rings_Fellowship_of_the_Ring.jpg/250px-Lord_of_the_Rings_Fellowship_of_the_Ring.jpg', '2001-12-19', '2024-12-01 00:44:53', 4),
(6, 'Titanic', 'A história de amor entre Jack e Rose a bordo do infame navio Titanic.', 'https://www.youtube.com/watch?v=kVrqfYjkTdQ', 'https://upload.wikimedia.org/wikipedia/pt/2/22/Titanic_poster.jpg', '1997-12-19', '2024-12-01 00:44:53', 6),
(7, 'Star Wars: O Império Contra-Ataca', 'Luke Skywalker enfrenta desafios enquanto tenta destruir o Império.', 'https://www.youtube.com/watch?v=JHFYAJevBbs', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCDAeZy-18_CP3jdXrSTGjA2poaOLLojpxXw&s', '1980-05-17', '2024-12-01 00:44:53', 5),
(8, 'Batman: O Cavaleiro das Trevas', 'Batman enfrenta o Coringa, que ameaça destruir Gotham City.', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 'https://play-lh.googleusercontent.com/b0bqoD27ib25NwPutF8Kf740iiFQ53CKUz27VBQkCQtvSfhdWQtb8vwFxxn-SzI-5ZATXXkDwf2qPODkNQ', '2008-07-18', '2024-12-01 00:44:53', 3),
(9, 'Vingadores: Ultimato', 'Os Vingadores devem unir forças para reverter o estalo de Thanos.', 'https://www.youtube.com/watch?v=TcMBFSGVi1c', 'https://img.elo7.com.br/product/zoom/259A7AA/big-poster-filme-vingadores-ultimato-lo001-tamanho-90x60-cm-poster-marvel.jpg', '2019-04-26', '2024-12-01 00:44:53', 5),
(10, 'O Poderoso Chefão', 'A história da família Corleone e sua ascensão ao poder no crime organizado.', 'https://www.youtube.com/watch?v=sY1S34973zA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7qVveFZtjzL0dWoWnpFiFvF1yKJmLjNy5w&s', '1972-03-24', '2024-12-01 00:44:53', 3),
(11, 'Inception', 'A mind-bending thriller by Christopher Nolan.', 'http://example.com/inception.mp4', 'http://example.com/inception.jpg', '2010-07-16', '2025-01-12 00:53:32', 1),
(12, 'missao impossivel', 'teste', 'http://example.com/teste', 'http://example.com/teste.jpg', '2014-07-16', '2025-01-12 01:14:23', 3),
(13, 'missao impossivel 2', 'teste 2', 'http://example.com/teste2', 'http://example.com/teste.jpg2', '2014-07-17', '2025-01-13 13:19:24', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `fotoUrl` varchar(255) DEFAULT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `nome`, `email`, `senha`, `fotoUrl`, `data_criacao`) VALUES
(1, 'julio akamine', 'juliooakamine@gmail.com', '$2b$10$spEC5DHtbKw86Vq5iR.k3uOGZ9kCEtHuIpwqayuYBL1wbiBuY3bBa', 'https://www.example.com/imagens/foto_usuario1.jpg', '2024-11-26 11:46:23'),
(2, 'teste1', 'teste1@gmail.com', '$2b$10$if32b.i7NbhkRJ1ALwmii.EEGvwTVEv5/Zz6zeNnhLJBIpnqXJW92', 'https://www.example.com/imagens/foto_usuario2.jpg', '2024-11-26 11:50:54'),
(3, 'julioakamineleite', 'julioAkamineLeite@gmail.com', '$2b$10$6lk8FWWcscZaU3fvwFzqjOMGpDI51Z7IdQ4xFV.H5rLvjvZNL7ac2', 'https://www.example.com/imagens/foto_usuario3.jpg', '2024-11-26 12:09:39'),
(4, 'Testedasilva', 'testedasilva@gmail.com', '$2b$10$bC9rwMI2IRUQkE9XDcMBA.vELYbWipxnnbydvq4TChcKP119s5ugq', 'https://www.example.com/imagens/foto_usuario4.jpg', '2024-11-26 12:19:51'),
(5, 'Marcelo Leite', 'marcelo.leite@gmail.com', '$2b$10$9vMSoV79mY9FkmFwqhtcyaH2zZhw5mgS9eXwHmJZEmtU1u92yqWGG', 'https://www.example.com/imagens/foto_usuario5.jpg', '2024-11-26 12:33:37'),
(6, 'Julio Cesar Akamine', 'julioAKAMINE@gmail.com', '$2b$10$DOpL8ZMXmnfkxqoN5rwTN.qJdO2GoMawk.2cX735WDd7khlwKzSDW', NULL, '2025-01-13 13:43:56'),
(7, 'Akamine', 'AKAMINE@gmail.com', '$2b$10$lKobSeFrwqInxGkr8Hcq8uMHhFO5a5JbY6ibNjzL1U2VBN.5qMr6u', 'www.exampleFotoUrl.com', '2025-01-13 13:45:53');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `movies`
--
ALTER TABLE `movies`
  ADD CONSTRAINT `movies_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
