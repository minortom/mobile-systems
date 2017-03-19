-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Gegenereerd op: 19 mrt 2017 om 15:20
-- Serverversie: 5.6.35
-- PHP-versie: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `42`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `answer`
--

CREATE TABLE `answer` (
  `id` int(11) NOT NULL,
  `askId` varchar(254) NOT NULL,
  `message` varchar(400) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int(11) NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ask`
--

CREATE TABLE `ask` (
  `id` int(11) NOT NULL,
  `userId` varchar(254) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `message` varchar(400) NOT NULL,
  `spam` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `ask`
--

INSERT INTO `ask` (`id`, `userId`, `date`, `message`, `spam`) VALUES
(1, '10208643688874916', '2017-03-19 11:43:41', 'Where is the best place in Amsterdam to buy shoes?', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `askTags`
--

CREATE TABLE `askTags` (
  `id` int(11) NOT NULL,
  `askId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `askTags`
--

INSERT INTO `askTags` (`id`, `askId`, `tagId`) VALUES
(1, 1, 167),
(2, 1, 168),
(3, 1, 169),
(4, 1, 170),
(5, 1, 171),
(6, 1, 172);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `askId` int(11) NOT NULL,
  `userId` varchar(254) NOT NULL,
  `matching` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `matches`
--

INSERT INTO `matches` (`id`, `askId`, `userId`, `matching`) VALUES
(1, 1, '10208643688874912', 1),
(2, 1, '10208643688874911', 4),
(3, 1, '10208643688874910', 3),
(4, 1, '1020864368887491', 2),
(5, 1, '1020864368887494', 5),
(6, 1, '1020864368887494', 6),
(7, 1, '1020864368887492', 2);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `tags`
--

INSERT INTO `tags` (`id`, `tag`) VALUES
(139, '24: legacy'),
(130, '333travel'),
(123, '9gag'),
(133, 'airmail'),
(46, 'albert heijn'),
(62, 'amac'),
(121, 'american dad'),
(167, 'amsterdam'),
(110, 'at random nijmegen'),
(92, 'autodrop drop-snoep'),
(78, 'autorijschool ties van grootel'),
(108, 'badminton'),
(56, 'batavierenrace'),
(8, 'bavaria'),
(172, 'best'),
(104, 'betty crocker'),
(72, 'blackburn'),
(34, 'blossom'),
(86, 'bol.com'),
(90, 'bols corenwyn'),
(69, 'burst'),
(169, 'buy'),
(1, 'bytco'),
(41, 'café santé'),
(138, 'californication'),
(70, 'canday'),
(49, 'chocomel'),
(118, 'club blush'),
(126, 'community'),
(25, 'cosi sc'),
(16, 'creative force'),
(55, 'css author'),
(145, 'daft punk'),
(52, 'dan bilzerian'),
(152, 'de jeugd van tegenwoordig'),
(132, 'de klusjesmannen'),
(42, 'de speld'),
(83, 'decubal - nooit meer een droge huid'),
(94, 'deejay divsa'),
(21, 'developmen'),
(95, 'dr. oetker pizza'),
(144, 'drake'),
(117, 'draw something'),
(30, 'dumpert.nl'),
(31, 'e.s.v.v. pusphaira international students soccer tournament'),
(15, 'emerce'),
(146, 'eric hutchinson'),
(116, 'esbv panache'),
(29, 'esvv pusphaira'),
(6, 'esvv pusphaira dames'),
(73, 'fabrique'),
(28, 'fairy tasty'),
(127, 'family guy'),
(106, 'fitness'),
(109, 'fontys flirt'),
(23, 'fort minor'),
(128, 'futurama'),
(9, 'glenfiddich'),
(125, 'gogo'),
(38, 'greenhouse group'),
(112, 'guus meeuwis'),
(80, 'gvdw'),
(89, 'hank moody'),
(107, 'hardlopen'),
(20, 'heineken'),
(149, 'hoobastank'),
(96, 'i love funny art'),
(71, 'ict & media design'),
(76, 'ikea'),
(75, 'indo\'s be like'),
(99, 'ing jongeren en studenten'),
(168, 'is'),
(26, 'j.ottenheijm webdesign'),
(17, 'jack daniel\'s tennessee whiskey'),
(147, 'jack johnson'),
(156, 'jamie cullum'),
(141, 'john legend'),
(143, 'john mayer'),
(103, 'johnnie walker'),
(12, 'jordykoppen.nl'),
(47, 'jumbo supermarkten'),
(155, 'justice'),
(87, 'kanye west'),
(35, 'kilroy netherlands'),
(50, 'klm royal dutch airlines'),
(91, 'koopmans'),
(18, 'kpn'),
(51, 'kygo'),
(24, 'la cravatta'),
(40, 'lebhacker'),
(135, 'let\'s drive in circles!'),
(134, 'like a boss.'),
(150, 'linkin park'),
(7, 'localwebs'),
(82, 'marketingfacts'),
(98, 'marloes de weijs fotografie'),
(61, 'mashable'),
(58, 'mashable - tech'),
(39, 'media markt nl'),
(53, 'mediamonks'),
(142, 'michael bublé'),
(114, 'ms41'),
(27, 'myfocus.nl'),
(113, 'nrv'),
(81, 'omdenken'),
(140, 'onerepublic'),
(77, 'onseindhoven.nl'),
(111, 'panache toernooi'),
(45, 'paradigit'),
(105, 'partout: digital native agency'),
(85, 'philips'),
(88, 'pietitie'),
(65, 'pinkpop festival'),
(170, 'place'),
(2, 'praktijk schillemans'),
(115, 'pridi hostel bangkok'),
(14, 'privilege events'),
(66, 'puck bertens fotografie'),
(4, 'pusphaira 10th lustrum'),
(48, 'rémy martin'),
(97, 'rimmel london'),
(22, 'rob designs'),
(136, 'robohuman'),
(36, 'schoolvakantiedeals.nl'),
(102, 'sd\' fotografie'),
(13, 'shiverburn'),
(171, 'shoes'),
(19, 'skotty.io'),
(84, 'sneakertom'),
(154, 'snow patrol'),
(93, 'socialdesk'),
(129, 'south park'),
(10, 'stichting vrienden sengerema hospital'),
(67, 'stroptitie'),
(11, 'supreme collection tailors'),
(74, 'surfspot.nl'),
(153, 't.i.'),
(68, 'tamtam'),
(59, 'techcrunch'),
(60, 'ted'),
(148, 'the beatles'),
(119, 'the best of eindhoven'),
(120, 'the big bang theory'),
(100, 'the flexican'),
(44, 'the lad bible'),
(64, 'the next web'),
(151, 'the opposites'),
(63, 'the verge'),
(137, 'threadless'),
(3, 'tui'),
(79, 'verse reclame'),
(131, 'visionears'),
(43, 'vormgevers & developers be like'),
(32, 'wereld natuur fonds (wnf)'),
(57, 'wired'),
(33, 'withlocals'),
(37, 'yakult nederland'),
(5, 'yoo bro'),
(101, 'youfone simonly'),
(124, 'zebra crossing'),
(122, 'zooey deschanel'),
(54, 'zuidontwerpt');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE `user` (
  `id` varchar(254) NOT NULL,
  `url` varchar(500) NOT NULL,
  `name` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `user`
--

INSERT INTO `user` (`id`, `url`, `name`) VALUES
('10208643688874912', 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/17103809_10208573758566702_2563184864267574297_n.jpg?oh=84e47f6b1b87198489d0613084b7a537&oe=596D5ABD', 'Tom Arnoldussen2'),
('10208643688874916', 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/17103809_10208573758566702_2563184864267574297_n.jpg?oh=84e47f6b1b87198489d0613084b7a537&oe=596D5ABD', 'Tom Arnoldussen');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `userTags`
--

CREATE TABLE `userTags` (
  `id` int(11) NOT NULL,
  `userId` varchar(254) NOT NULL,
  `tagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `userTags`
--

INSERT INTO `userTags` (`id`, `userId`, `tagId`) VALUES
(1, '10208643688874916', 1),
(2, '10208643688874916', 2),
(3, '10208643688874916', 3),
(4, '10208643688874916', 4),
(5, '10208643688874916', 5),
(6, '10208643688874916', 6),
(7, '10208643688874916', 7),
(8, '10208643688874916', 8),
(9, '10208643688874916', 9),
(10, '10208643688874916', 10),
(11, '10208643688874916', 11),
(12, '10208643688874916', 12),
(13, '10208643688874916', 13),
(14, '10208643688874916', 14),
(15, '10208643688874916', 15),
(16, '10208643688874916', 16),
(17, '10208643688874916', 17),
(18, '10208643688874916', 18),
(19, '10208643688874916', 19),
(20, '10208643688874916', 20),
(21, '10208643688874916', 21),
(22, '10208643688874916', 22),
(23, '10208643688874916', 23),
(24, '10208643688874916', 24),
(25, '10208643688874916', 25),
(26, '10208643688874916', 26),
(27, '10208643688874916', 27),
(28, '10208643688874916', 28),
(29, '10208643688874916', 29),
(30, '10208643688874916', 30),
(31, '10208643688874916', 31),
(32, '10208643688874916', 32),
(33, '10208643688874916', 33),
(34, '10208643688874916', 34),
(35, '10208643688874916', 35),
(36, '10208643688874916', 36),
(37, '10208643688874916', 37),
(38, '10208643688874916', 38),
(39, '10208643688874916', 39),
(40, '10208643688874916', 40),
(41, '10208643688874916', 41),
(42, '10208643688874916', 42),
(43, '10208643688874916', 43),
(44, '10208643688874916', 44),
(45, '10208643688874916', 45),
(46, '10208643688874916', 46),
(47, '10208643688874916', 47),
(48, '10208643688874916', 48),
(49, '10208643688874916', 49),
(50, '10208643688874916', 50),
(51, '10208643688874916', 51),
(52, '10208643688874916', 52),
(53, '10208643688874916', 53),
(54, '10208643688874916', 54),
(55, '10208643688874916', 55),
(56, '10208643688874916', 56),
(57, '10208643688874916', 57),
(58, '10208643688874916', 58),
(59, '10208643688874916', 59),
(60, '10208643688874916', 60),
(61, '10208643688874916', 61),
(62, '10208643688874916', 62),
(63, '10208643688874916', 63),
(64, '10208643688874916', 64),
(65, '10208643688874916', 65),
(66, '10208643688874916', 66),
(67, '10208643688874916', 67),
(68, '10208643688874916', 68),
(69, '10208643688874916', 69),
(70, '10208643688874916', 70),
(71, '10208643688874916', 71),
(72, '10208643688874916', 72),
(73, '10208643688874916', 73),
(74, '10208643688874916', 74),
(75, '10208643688874916', 75),
(76, '10208643688874916', 76),
(77, '10208643688874916', 77),
(78, '10208643688874916', 78),
(79, '10208643688874916', 79),
(80, '10208643688874916', 80),
(81, '10208643688874916', 81),
(82, '10208643688874916', 82),
(83, '10208643688874916', 83),
(84, '10208643688874916', 84),
(85, '10208643688874916', 85),
(86, '10208643688874916', 86),
(87, '10208643688874916', 87),
(88, '10208643688874916', 88),
(89, '10208643688874916', 89),
(90, '10208643688874916', 90),
(91, '10208643688874916', 91),
(92, '10208643688874916', 92),
(93, '10208643688874916', 93),
(94, '10208643688874916', 94),
(95, '10208643688874916', 95),
(96, '10208643688874916', 96),
(97, '10208643688874916', 97),
(98, '10208643688874916', 98),
(99, '10208643688874916', 99),
(100, '10208643688874916', 100),
(101, '10208643688874916', 101),
(102, '10208643688874916', 102),
(103, '10208643688874916', 103),
(104, '10208643688874916', 104),
(105, '10208643688874916', 105),
(106, '10208643688874916', 106),
(107, '10208643688874916', 107),
(108, '10208643688874916', 108),
(109, '10208643688874916', 109),
(110, '10208643688874916', 110),
(111, '10208643688874916', 111),
(112, '10208643688874916', 112),
(113, '10208643688874916', 113),
(114, '10208643688874916', 114),
(115, '10208643688874916', 115),
(116, '10208643688874916', 116),
(117, '10208643688874916', 117),
(118, '10208643688874916', 118),
(119, '10208643688874916', 119),
(120, '10208643688874916', 120),
(121, '10208643688874916', 121),
(122, '10208643688874916', 122),
(123, '10208643688874916', 123),
(124, '10208643688874916', 124),
(125, '10208643688874916', 125),
(126, '10208643688874916', 126),
(127, '10208643688874916', 127),
(128, '10208643688874916', 128),
(129, '10208643688874916', 129),
(130, '10208643688874916', 130),
(131, '10208643688874916', 131),
(132, '10208643688874916', 132),
(133, '10208643688874916', 133),
(134, '10208643688874916', 134),
(135, '10208643688874916', 135),
(136, '10208643688874916', 136),
(137, '10208643688874916', 137),
(138, '10208643688874916', 138),
(139, '10208643688874916', 139),
(140, '10208643688874916', 140),
(141, '10208643688874916', 141),
(142, '10208643688874916', 142),
(143, '10208643688874916', 143),
(144, '10208643688874916', 144),
(145, '10208643688874916', 145),
(146, '10208643688874916', 146),
(147, '10208643688874916', 147),
(148, '10208643688874916', 148),
(149, '10208643688874916', 149),
(150, '10208643688874916', 150),
(151, '10208643688874916', 151),
(152, '10208643688874916', 152),
(153, '10208643688874916', 153),
(154, '10208643688874916', 154),
(155, '10208643688874916', 155),
(156, '10208643688874916', 156),
(157, '10208643688874912', 157),
(158, '10208643688874912', 167);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `ask`
--
ALTER TABLE `ask`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `askTags`
--
ALTER TABLE `askTags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_index` (`askId`,`tagId`);

--
-- Indexen voor tabel `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tag_2` (`tag`);
ALTER TABLE `tags` ADD FULLTEXT KEY `tag` (`tag`);

--
-- Indexen voor tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `userTags`
--
ALTER TABLE `userTags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ix_uq` (`id`,`userId`,`tagId`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `answer`
--
ALTER TABLE `answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT voor een tabel `ask`
--
ALTER TABLE `ask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT voor een tabel `askTags`
--
ALTER TABLE `askTags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT voor een tabel `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT voor een tabel `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;
--
-- AUTO_INCREMENT voor een tabel `userTags`
--
ALTER TABLE `userTags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
