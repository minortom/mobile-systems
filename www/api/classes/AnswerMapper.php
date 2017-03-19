<?php

class AnswerMapper extends Mapper
{
    public function getUserAnswer(AnswerEntity $answer) {
        $fbid = $answer->getFbid();
        if(!isset($fbid)) {
            return  array("success"=>false, "message"=>"Search term was not given");
        }
        $stmt = $this->db->prepare("SELECT askId, id, userId, matching FROM matches WHERE askId IN (SELECT askId FROM (SELECT tr.askId FROM ask AS t
   INNER JOIN matches AS tr 
   ON t.id = tr.askId ORDER BY tr.matching DESC LIMIT 5) as j) 
   AND userId = :fbid ORDER BY matching DESC");
        $stmt->execute(array(':fbid'=>$fbid));
        $result = $stmt->fetchAll();
        if (!empty($result) ) {
            foreach ($result as $ask) {
                $stmt = $this->db->prepare("SELECT * FROM ask WHERE id = :askid ORDER BY date DESC");
                $stmt->execute(array(':askid'=>$ask['askId']));
                $result = $stmt->fetchAll();
                if (!empty($result) ) {
                    $count = 0;
                    foreach ($result as $answer) {
                        $stmt = $this->db->prepare("SELECT * FROM answer WHERE askId = :askid");
                        $stmt->execute(array(':askid'=>$answer['id']));
                        $answer = $stmt->fetchAll();
                        $result[$count]['answers'] = $answer;
                        $count += 1;
                    }
                    $message = array("success"=>true, "message"=>"User questions are received", "data"=>$result);
                } else {
                    $message = array("success"=>false, "message"=>"Something went wrong while retrieving");
                }
            }
            $message = array("success"=>true, "message"=>"Matches submitted", "data"=> $result);
        } else {
            $message = array("success"=>false, "message"=>"Something went wrong while matching");
        } 
        return $message;
    }
   
    
  
  
}
