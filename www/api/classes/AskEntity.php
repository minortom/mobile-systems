<?php

class AskEntity
{
    protected $fbid;
    protected $message;
    protected $tags;

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
        if(isset($body['message'])) {
            $this->message = filter_var($body['message'], FILTER_SANITIZE_STRING);
        } else {
            $this->message = false;
        }
        if(isset($body['askid'])) {
            $this->askid = filter_var($body['askid'], FILTER_SANITIZE_STRING);
        } else {
            $this->askid = false;
        }
        if(isset($body['tags'])) {
            $this->tags = $body['tags'];
        } else {
            $this->tags = false;
        }
       
    }

    public function getFbid() {
        return $this->fbid;
    }

    public function getMessage() {
        return $this->message;
    }

    public function getTags() {
        return $this->tags;
    }

    public function getAskId() {
        return $this->askid;
    }
}
