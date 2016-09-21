<?php
// must be run within Dokuwiki
if(!defined('DOKU_INC')) die();

class action_plugin_customimagesizes extends DokuWiki_Action_Plugin {

    /**
     * Registers function hooks
     *
     * @author Thomas Müller
     * 
     * @param  Doku_Event_Handler    controller    The event handler object
     */
    public function register( Doku_Event_Handler $controller ) {
        $controller->register_hook( 'MEDIAMANAGER_STARTED', 'AFTER', $this, 'addsizes' );
    }

    /**
     * Adds sizes to the global JSINFO Javascript variable
     *
     * @author Thomas Müller
     * 
     * @param  Doku_Event    event    The DokuWiki event object
     * @param  boolean       param    Null value
     */
    public function addsizes( Doku_Event &$event, $param ) {
        global $JSINFO;
        
        $JSINFO['customimagesizes'] = array(
            '1' => (string)$this->getConf( 'small' ),
            '2' => (string)$this->getConf( 'medium' ),
            '3' => (string)$this->getConf( 'large' )
        );
    }
}