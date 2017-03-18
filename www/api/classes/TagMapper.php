<?php

class TagMapper extends Mapper
{
    public function search(TagEntity $search) {
        $search = $search->getSearch();
        if(!$search) {
            return  array("success"=>false, "message"=>"Search term was not given");
        }
        $stmt = $this->db->prepare("SELECT * FROM tags WHERE MATCH(tag) against (:search IN BOOLEAN MODE) LIMIT 10");
        $stmt->execute(array(':search'=>"*".$search."*"));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($result) ) {
            $message = array("success"=>true, "message"=>"Tags successfully retrieved", "data"=>$result);
        } else {
            $message = array("success"=>false, "message"=>"No tags found");
        }
        return $message;
    }
   
    
  
  
}
