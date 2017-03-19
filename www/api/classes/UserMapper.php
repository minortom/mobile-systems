<?php

class UserMapper extends Mapper
{
    public function postUser(UserEntity $user) {
        $url = $user->getUrl();
        $fbid = $user->getFbid();
        $name = $user->getName();
        if(!$url || !$fbid || !$name) {
            return  array("success"=>false, "message"=>"Forgot some params");
        }
        $stmt = $this->db->prepare("INSERT INTO user (id, url, name) SELECT :fbid, :url, :name
            FROM (select 1) as a WHERE NOT EXISTS(SELECT id FROM user WHERE id = :fbid) LIMIT 1");
        $stmt->execute(array(':url'=>$url, ':fbid'=>$fbid, ':name'=>$name));
        if($stmt) {
            $message = array("success"=>true, "message"=>"User has been submitted");
        } else {
            $message = array("success"=>false, "message"=>"User already exists");
        }
        return $message;
    }
    public function postUserTags(UserEntity $user) {
        $fbid = $user->getFbid();
        $likes = $user->getLikes();
        if(!isset($likes) || !isset($fbid)) {
            return  array("success"=>false, "message"=>"Forgot some params");
        }
        foreach ($likes as $tag) {
            $tag = strtolower($tag);
            $stmt = $this->db->prepare("INSERT INTO tags (tag) SELECT :tag
            FROM (select 1) as a WHERE NOT EXISTS(SELECT tag FROM tags WHERE tag = :tag) LIMIT 1;");
            $stmt->execute(array(':tag'=>$tag));
            if($stmt) {
                $id = $this->db->lastInsertId();
                if($id > 0) {
                    $stmt = $this->db->prepare("INSERT INTO userTags (userId, tagId) 
                    SELECT :fbid, :tagid FROM (select 1) as a WHERE NOT EXISTS(SELECT userId, tagId FROM userTags WHERE userId = :fbid AND tagId = :tagid) LIMIT 1;");
                    $stmt->execute(array(':tagid'=>$id, ':fbid'=>$fbid));
                } else {
                    $stmt = $this->db->prepare("SELECT id FROM tags WHERE tag = :tag;");
                    $stmt->execute(array(':tag'=>$tag));
                    $result = $stmt->fetchAll();

                    $stmt = $this->db->prepare("SELECT id, userId FROM userTags WHERE tagId = :tagid AND userId = :fbid;");
                    $stmt->execute(array(':tagid'=>$result[0]['id'], ':fbid'=>$fbid));
                    $tempid = $result[0]['id'];
                    $result = $stmt->fetchAll();
                    if(empty($result)) {
                        $stmt = $this->db->prepare("INSERT INTO userTags (userId, tagId) SELECT :fbid, :tagid FROM (select 1) as a 
                            WHERE NOT EXISTS(SELECT userId, tagId FROM userTags WHERE userId = :fbid AND tagId = :tagid) LIMIT 1;");
                        $stmt->execute(array(':tagid'=>$tempid , ':fbid'=>$fbid));
                    }
                }
            }
        }
        return  array("success"=>true, "message"=>"Returned some");
    }
    public function getUserTags(UserEntity $user) {
        $fbid = $user->getFbid();
        if(!isset($fbid)) {
            return  array("success"=>false, "message"=>"Forgot some params");
        }
        $stmt = $this->db->prepare("SELECT tag, id FROM tags WHERE id IN (SELECT tagId FROM userTags WHERE userId = :fbid)");
        $stmt->execute(array(':fbid'=>$fbid));
        $result = $stmt->fetchAll();
        if (!empty($result) ) {
            $message = array("success"=>true, "message"=>"User tags are received", "data"=>$result);
        } else {
            $message = array("success"=>false, "message"=>"Something went wrong while retrieving");
        }
        return $message;
    }
  
  
}
