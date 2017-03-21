<?php

class AnswerMapper extends Mapper
{
    public function getUserAnswer(AnswerEntity $answer) {
        $fbid = $answer->getFbid();
        if(!isset($fbid)) {
            return  array("success"=>false, "message"=>"Search term was not given");
        }
        $stmt = $this->db->prepare("SELECT * FROM ask ORDER BY date DESC");
        $stmt->execute();
        $resultt = $stmt->fetchAll();

        $all = [];
        $count = 0;
        foreach ($resultt as $r) {
            $stmt = $this->db->prepare("SELECT askId, id, userId, matching FROM matches WHERE askId IN (SELECT askId FROM (SELECT tr.askId FROM ask AS t
               INNER JOIN matches AS tr 
               ON t.id = tr.askId WHERE tr.askId = :askid ORDER BY tr.matching DESC LIMIT 5) as j) 
               AND userId = :fbid ORDER BY matching DESC");
            $stmt->execute(array(':fbid'=>$fbid, ':askid'=>$r['id']));
            $result = $stmt->fetchAll();
            if (!empty($result) ) {
                foreach ($result as $ask) {
                    $stmt = $this->db->prepare("SELECT *, (SELECT url FROM user WHERE id = ask.userId) AS image, (SELECT name FROM user WHERE id = ask.userId) AS name FROM ask WHERE id = :askid ORDER BY date DESC");
                    $stmt->execute(array(':askid'=>$ask['askId']));
                    $result = $stmt->fetchAll();
                    if (!empty($result) ) {
                        foreach ($result as $answer) {
                            $stmt = $this->db->prepare("SELECT *, (SELECT url FROM user WHERE user.id = answer.userId) AS image, (SELECT name FROM user WHERE user.id = answer.userId) AS name FROM answer WHERE askId = :askid");
                            $stmt->execute(array(':askid'=>$answer['id']));
                            $answer = $stmt->fetchAll();
                            $result[0]['answers'] = $answer;
                        }
                        $message = array("success"=>true, "message"=>"User questions are received", "data"=>$result);
                    } else {
                        $message = array("success"=>false, "message"=>"Something went wrong while retrieving");
                    }

                }
                 $all[] = $result[0];
                $message = array("success"=>true, "message"=>"Matches submitted", "data"=> $all);
            } else {
                $message = array("success"=>false, "message"=>"Something went wrong while matching", "data"=> $result);
            }
        }
        return $message;
    }
   
    public function postUserAnswer(AnswerEntity $answer) {
        $fbid = $answer->getFbid();
        $askid = $answer->getAskid();
        $message = $answer->getMessage();
        if(!isset($fbid) || !isset($askid) || !isset($message)) {
            return  array("success"=>false, "message"=>"Search term was not given");
        }
        $stmt = $this->db->prepare("INSERT INTO answer (askId, message, userId) VALUES (:askid, :message, :fbid)");
        $stmt->execute(array(':askid'=>$askid, ':fbid'=>$fbid, ':message'=>$message));
        if($stmt) {
            $message = array("success"=>true, "message"=>"User has been submitted");
        } else {
            $message = array("success"=>false, "message"=>"User already exists");
        }
        return $message;
    }

    public function postAcceptAnswer(AnswerEntity $answer) {
        $answerid = $answer->getAnswerid();
        if(!isset($answerid)) {
            return  array("success"=>false, "message"=>"Search term was not given");
        }
        $stmt = $this->db->prepare("UPDATE answer
SET accepted = 1
WHERE id=:answerid ");
        $stmt->execute(array(':answerid'=>$answerid));
        if($stmt) {
            $message = array("success"=>true, "message"=>"User has been submitted");
        } else {
            $message = array("success"=>false, "message"=>"User already exists");
        }
        return $message;
    }
  
  
}
