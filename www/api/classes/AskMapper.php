<?php

class AskMapper extends Mapper
{
    public function postAsk(AskEntity $ask) {
        $message = $ask->getMessage();
        $fbid = $ask->getFbid();
        if(!isset($fbid) || !isset($message)) {
            return  array("success"=>false, "message"=>"Not all params given");
        }
        $stmt = $this->db->prepare("INSERT IGNORE INTO ask (userId, message) 
            VALUES (:fbid, :message);");
        $stmt->execute(array(':message'=>$message, ':fbid'=>$fbid));
        if($stmt) {
            $id = $this->db->lastInsertId();
            $message = array("success"=>true, "message"=>"Question has been submitted", "data"=>$id);
        } else {
            $message = array("success"=>false, "message"=>"Question already exists");
        }
        return $message;
    }

    public function postAskTags(AskEntity $ask) {
        $tags = $ask->getTags();
        $askId = $ask->getAskId();
        if(!isset($tags) || !isset($askId)) {
            return  array("success"=>false, "message"=>"Forgot some params");
        }
        foreach ($tags as $tag) {
            $tag = strtolower($tag);
            $stmt = $this->db->prepare("INSERT INTO tags (tag) 
            SELECT :tag
            FROM (select 1) as a WHERE NOT EXISTS(SELECT tag FROM tags WHERE tag = :tag) LIMIT 1;");
            $stmt->execute(array(':tag'=>$tag));
            if($stmt) {
                $id = $this->db->lastInsertId();
                if($id > 0) {
                    $stmt = $this->db->prepare("INSERT INTO askTags (askId, tagId) 
                         SELECT :askid, :tagid
            FROM (select 1) as a WHERE NOT EXISTS(SELECT askId, tagId FROM askTags WHERE askId = :askid AND  tagId =:tagid) LIMIT 1;");
                    $stmt->execute(array(':tagid'=>$id, ':askid'=>$askId));
                } else {
                    $stmt = $this->db->prepare("SELECT id FROM tags WHERE tag = :tag;");
                    $stmt->execute(array(':tag'=>$tag));
                    $result = $stmt->fetchAll();

                    $stmt = $this->db->prepare("SELECT id, askId FROM askTags WHERE tagId = :tagid AND askId = :askid;");
                    $stmt->execute(array(':tagid'=>$result[0]['id'], ':askid'=>$askId));
                    $tempid = $result[0]['id'];
                    $result = $stmt->fetchAll();
                    if(empty($result)) {
                        $stmt = $this->db->prepare("INSERT INTO askTags (askId, tagId) 
                         SELECT :askid, :tagid
            FROM (select 1) as a WHERE NOT EXISTS(SELECT askId, tagId FROM askTags WHERE askId = :askid AND  tagId =:tagid) LIMIT 1;");
                        $stmt->execute(array(':tagid'=>$tempid , ':askid'=>$askId));
                    }
                }
            }
        }
        return  array("success"=>true, "message"=>"Returned some");
    }
    public function getUserAsk(AskEntity $user) {
        $fbid = $user->getFbid();
        if(!isset($fbid)) {
            return  array("success"=>false, "message"=>"Forgot some params");
        }
        
        $stmt = $this->db->prepare("SELECT *, (SELECT url FROM user WHERE id = :fbid) AS image, (SELECT name FROM user WHERE id = :fbid) AS name FROM ask WHERE userId = :fbid ORDER BY date DESC");
        $stmt->execute(array(':fbid'=>$fbid));
        $result = $stmt->fetchAll();
        if (!empty($result) ) {
            $count = 0;
            foreach ($result as $ask) {
                $stmt = $this->db->prepare("SELECT *, (SELECT url FROM user WHERE user.id = answer.userId) AS image, (SELECT name FROM user WHERE user.id = answer.userId) AS name FROM answer WHERE askId = :id");
                $stmt->execute(array(':id'=>$ask['id']));
                $answer = $stmt->fetchAll();
                $result[$count]['answers'] = $answer;
                $count += 1;
            }
            $message = array("success"=>true, "message"=>"User questions are received", "data"=>$result);
        } else {
            $message = array("success"=>false, "message"=>"Something went wrong while retrieving");
        }
        return $message;
    }
    public function findBestMatch(AskEntity $ask) {
        $askId = $ask->getAskId();
        if(!isset($askId)) {
            return  array("success"=>false, "message"=>"Forgot some params");
        }
        $stmt = $this->db->prepare("SELECT t.*, COUNT(*) as matches, tr.userId FROM askTags AS t
   INNER JOIN userTags AS tr 
   ON t.tagId = tr.tagId WHERE t.askId = :askid");
        $stmt->execute(array(':askid'=>$askId));
        $result = $stmt->fetchAll();
        if (!empty($result) ) {
            $count = 0;
            foreach ($result as $ask) {
                $stmt = $this->db->prepare("INSERT INTO matches (askId, userId, matching) 
                         SELECT :askid, :userid, :matching
            FROM (select 1) as a WHERE NOT EXISTS(SELECT askId, userId, matching FROM matches WHERE askId = :askid AND  userId =:userid AND matching = :matching) LIMIT 1;");
                $stmt->execute(array(':askid'=>$ask['askId'], ':userid'=>$ask['userId'], ':matching'=>$ask['matches']));
            }
            $message = array("success"=>true, "message"=>"Matches submitted");
        } else {
            $message = array("success"=>false, "message"=>"Something went wrong while matching");
        } 
        return $message;
    }
    
  
  
}
