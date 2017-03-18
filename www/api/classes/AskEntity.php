<?php

class AskEntity
{
    protected $search;

    /**
     * Accept an array of data matching properties of this class
     * and create the class
     *
     * @param array $data The data to use to create
     */
    public function __construct($data, $args) {
        // no id if we're creating
    
      
        if(isset($args['search'])) {
            $this->search = filter_var($args['search'], FILTER_SANITIZE_STRING);
        } else {
            $this->search = false;
        }
       
    }

    public function getSearch() {
        return $this->search;
    }
}
