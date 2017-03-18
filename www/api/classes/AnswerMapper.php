<?php

class AnswerMapper extends Mapper
{
    public function search(AnswerEntity $search) {
        $search = $search->getSearch();
        if(!$search) {
            return  array("success"=>false, "message"=>"Search term was not given");
        }
        $stmt = $this->db->prepare("SELECT * FROM (SELECT gid, name, comment, begin_date_year, group_concat(url ORDER BY url DESC) as 'images' FROM artist WHERE MATCH(firstName, lastName) against (:search IN BOOLEAN MODE)  GROUP BY gid) AS q1 WHERE q1.name LIKE :ssearch ORDER BY LENGTH(q1.images) DESC LIMIT 10");
        $stmt->execute(array(':search'=>"*".$search."*", ':ssearch'=> "%".$search."%"));
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($result) ) {
            $message = array("success"=>true, "message"=>"Artists successfully retrieved", "data"=>$result);
        } else {
            $message = array("success"=>false, "message"=>"No artist found");
        }
        return $message;
    }
   
    
  
  
}
