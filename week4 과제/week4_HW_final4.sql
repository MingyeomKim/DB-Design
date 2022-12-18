-- MySQL Workbench Forward Engineering
SET FOREIGN_KEY_CHECKS = 0;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Inha
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Inha
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Inha` DEFAULT CHARACTER SET utf8 ;
USE `Inha` ;

-- -----------------------------------------------------
-- Table `Inha`.`Building`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Building` (
  `Id` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Room` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL,
  `Capacity` INT NULL,
  `Building_Id` INT NOT NULL,
  PRIMARY KEY (`Id`, `Building_Id`),
  INDEX `fk_Room_Building1_idx` (`Building_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Room_Building1`
    FOREIGN KEY (`Building_Id`)
    REFERENCES `Inha`.`Building` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Department` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NULL,
  `Phone_number` VARCHAR(45) NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `Phone_number_UNIQUE` (`Phone_number` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Class`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Class` (
  `Id` VARCHAR(10) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Professor` VARCHAR(10) NOT NULL,
  `Number of participants` INT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Student` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(10) NOT NULL,
  `Email` VARCHAR(45) NULL,
  `Phone_number` VARCHAR(45) NULL,
  `Student_id` INT NOT NULL,
  `Major` INT NOT NULL,
  PRIMARY KEY (`Id`, `Major`),
  UNIQUE INDEX `Student_id_UNIQUE` (`Student_id` ASC) VISIBLE,
  UNIQUE INDEX `Phone_number_UNIQUE` (`Phone_number` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  INDEX `fk_Student_Department1_idx` (`Major` ASC) VISIBLE,
  CONSTRAINT `fk_Student_Department1`
    FOREIGN KEY (`Major`)
    REFERENCES `Inha`.`Department` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Class_has_Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Class_has_Student` (
  `Class_Id` VARCHAR(10) NOT NULL,
  `Student_Id` INT NOT NULL,
  `Student_Major` INT NOT NULL,
  PRIMARY KEY (`Class_Id`, `Student_Id`, `Student_Major`),
  INDEX `fk_Class_has_Student_Student1_idx` (`Student_Id` ASC, `Student_Major` ASC) VISIBLE,
  INDEX `fk_Class_has_Student_Class1_idx` (`Class_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Class_has_Student_Class1`
    FOREIGN KEY (`Class_Id`)
    REFERENCES `Inha`.`Class` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Class_has_Student_Student1`
    FOREIGN KEY (`Student_Id` , `Student_Major`)
    REFERENCES `Inha`.`Student` (`Id` , `Major`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Inha`.`Room_has_Class`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Inha`.`Room_has_Class` (
  `Room_Id` INT NOT NULL,
  `Room_Building_Id` INT NOT NULL,
  `Class_Id` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`Room_Id`, `Room_Building_Id`, `Class_Id`),
  INDEX `fk_Room_has_Class_Class1_idx` (`Class_Id` ASC) VISIBLE,
  INDEX `fk_Room_has_Class_Room1_idx` (`Room_Id` ASC, `Room_Building_Id` ASC) VISIBLE,
  CONSTRAINT `fk_Room_has_Class_Room1`
    FOREIGN KEY (`Room_Id` , `Room_Building_Id`)
    REFERENCES `Inha`.`Room` (`Id` , `Building_Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Room_has_Class_Class1`
    FOREIGN KEY (`Class_Id`)
    REFERENCES `Inha`.`Class` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

ALTER TABLE building CONVERT TO CHARSET UTF8;
ALTER TABLE room CONVERT TO CHARSET UTF8;
ALTER TABLE department CONVERT TO CHARSET UTF8;
ALTER TABLE class CONVERT TO CHARSET UTF8;
ALTER TABLE student CONVERT TO CHARSET UTF8;


insert into building values (9, "9호관");
insert into building values (10, "하이테크관"); 
insert into building values (1, "본관");
insert into building values (2, "2호관"); 
insert into building values (4, "서호관");

insert into room(Name, Capacity, Building_Id) values ("정보통신공학과 학생회의실", NULL, 10);
insert into room(Name, Capacity, Building_Id) values ("002 강의실", 40, 4); 
insert into room(Name, Capacity, Building_Id) values ("하이테크 대강당", 230, 10); 
insert into room(Name, Capacity, Building_Id) values ("공과대학 행정실", NULL, 2); 
insert into room(Name, Capacity, Building_Id) values ("252 강의실", 100, 9);

insert into class values ("ICE4016", "Operating System", "김기창 교수님", 42); 
insert into class values ("ICE4008", "컴퓨터 네트워크", "유상조 교수님", 50);
insert into class values ("ICE4020", "정보 보호론", "김기창 교수님", 30); 
insert into class values ("ICE4010", "이동통신", "김덕경 교수님", 45);
insert into class values ("GEE4011", "세상을 바꾸는 스타트업 이야기", "허원창", 320); 

insert into department(Name, Email, Phone_number) values ("정보통신공학과", "ice@inha.ac.kr", "032-860-7430");
insert into department(Name, Email, Phone_number) values ("전기공학과", "electrical@inha.ac.kr", "032-860-7390");
insert into department(Name, Email, Phone_number) values ("전자공학과", "ee@inha.ac.kr", "032-860-7410"); 
insert into department(Name, Email, Phone_number) values ("컴퓨터공학과", "cse@inha.ac.kr", "032-860-7440"); 
insert into department(Name, Email, Phone_number) values ("기계공학과", "mech@inha.ac.kr", "032-860-7300");

insert into student(Name, Email, Phone_number, Student_id, Major) values ("김민겸", "mingyum119@naver.com", "010-9479-0373", 12201863, 9); 
insert into student(Name, Email, Phone_number, Student_id, Major) values ("이슬", "leeseul@inha.ac.kr", "010-0000-1234", 12201943, 13); 
insert into student(Name, Email, Phone_number, Student_id, Major) values ("조한나", "whgkssk@inha.edu", "010-0000-0000", 12201512, 11);
insert into student(Name, Email, Phone_number, Student_id, Major) values ("김다영", "ralekdud@naver.com", "010-0000-3465", 12201212, 10);
insert into student(Name, Email, Phone_number, Student_id, Major) values ("최수빈", "chltnqls@google.com", "010-0000-2333", 12201313, 9); 

SET FOREIGN_KEY_CHECKS = 1;