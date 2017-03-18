<?php

class UserMapper extends Mapper
{
    public function postUser(UserEntity $user) {
        $username = $user->getUsername();
        $fbid = $user->getFbid();
        $name = $user->getName();
        if(!$username || !$fbid || !$name) {
            return  array("success"=>false, "message"=>"Forgot some params");
        }
        $stmt = $this->db->prepare("INSERT INTO user (id, username, name) 
            VALUES (:fbid, :username, :name) ON DUPLICATE KEY UPDATE id = values(id), username = values(username), name = values(name);");
        $stmt->execute(array(':username'=>$username, ':fbid'=>$fbid, ':name'=>$name));
        if($stmt) {
            $message = array("success"=>true, "message"=>"Username has been submitted");
        } else {
            $message = array("success"=>false, "message"=>"Username already exists");
        }
        return $message;
    }
   
    
  
  
}
