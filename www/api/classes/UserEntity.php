<?php

class UserEntity
{
    protected $fbid;
    protected $username;
    protected $name;

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
        if(isset($body['username'])) {
            $this->username = filter_var($body['username'], FILTER_SANITIZE_STRING);
        } else {
            $this->username = false;
        }
        if(isset($body['name'])) {
            $this->name = filter_var($body['name'], FILTER_SANITIZE_STRING);
        } else {
            $this->name = false;
        }
       
    }

    public function getFbid() {
        return $this->fbid;
    }
    public function getUsername() {
        return $this->username;
    }
    public function getName() {
        return $this->name;
    }
}
