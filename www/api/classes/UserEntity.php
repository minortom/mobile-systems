<?php

class UserEntity
{
    protected $fbid;
    protected $url;
    protected $name;
    protected $likes;
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
            $this->fbid = $body['fbid'];
        } else {
            $this->fbid = false;
        }
        if(isset($body['url'])) {
            $this->url = filter_var($body['url'], FILTER_SANITIZE_STRING);
        } else {
            $this->url = false;
        }
        if(isset($body['name'])) {
            $this->name = filter_var($body['name'], FILTER_SANITIZE_STRING);
        } else {
            $this->name = false;
        }
        if(isset($body['likes'])) {
            $this->likes = $body['likes'];
        } else {
            $this->likes = false;
        }
       
    }

    public function getFbid() {
        return $this->fbid;
    }
    public function getUrl() {
        return $this->url;
    }
    public function getName() {
        return $this->name;
    }
    public function getLikes() {
        return $this->likes;
    }
}
