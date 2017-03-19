<?php

class AnswerEntity
{
    protected $fbid;
    protected $askid;
    protected $message;
    protected $answerid;

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
        if(isset($body['answerid'])) {
            $this->answerid = filter_var($body['answerid'], FILTER_SANITIZE_STRING);
        } else {
            $this->answerid = false;
        }
        if(isset($body['message'])) {
            $this->message = $body['message'];
        } else {
            $this->message = false;
        }
       
    }

    public function getFbid() {
        return $this->fbid;
    }
    public function getAskid() {
        return $this->askid;
    }
    public function getMessage() {
        return $this->message;
    }
    public function getAnswerid() {
        return $this->answerid;
    }
}
