<?php

class AnswerEntity
{
    protected $fbid;
    protected $askid;

    /**
     * Accept an array of data matching properties of this class
     * and create the class
     *
     * @param array $data The data to use to create
     */
    public function __construct($data) {
        // no id if we're creating
    
        $body = $data->getParsedBody();
        if(isset($body['fbid'])) {
            $this->fbid = filter_var($body['fbid'], FILTER_SANITIZE_STRING);
        } else {
            $this->fbid = false;
        }
        if(isset($body['askid'])) {
            $this->askid = filter_var($body['askid'], FILTER_SANITIZE_STRING);
        } else {
            $this->askid = false;
        }
       
    }

    public function getFbid() {
        return $this->fbid;
    }
    public function getAskid() {
        return $this->askid;
    }
}
