<?php 
/**
 * License page is a place where a user can check updated and manage the license.
 */
class SocialLocker_LicenseManagerPage extends OnpLicensing325_LicenseManagerPage  {
 
    public $purchasePrice = '$25';
    
    public function configure() {
        
        if( !current_user_can('administrator') )
            $this->capabilitiy = "manage_opanda_licensing";
                $this->purchasePrice = '$25';
            

        

            $this->menuPostType = OPANDA_POST_TYPE;
        

    }
}

FactoryPages321::register($sociallocker, 'SocialLocker_LicenseManagerPage');
 

