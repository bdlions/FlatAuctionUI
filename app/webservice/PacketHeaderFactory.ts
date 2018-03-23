import {PacketHeader} from './PacketHeader';
import {ACTION} from './ACTION';
import {REQUEST_TYPE} from './REQUEST_TYPE';
import {UUID} from './../../../node_modules/angular2-uuid/index.js';

export class PacketHeaderFactory {
    public static getHeader(action: ACTION):PacketHeader{
        let packetHeader = new PacketHeader();
        let sessionId = localStorage.getItem("sessionId");
        if (sessionId == "" || sessionId == null){
            packetHeader.sessionId = null;
        }
        else{
            packetHeader.sessionId = sessionId;
        }
      
        packetHeader.action = action;
        packetHeader.packetId = UUID.UUID();
        switch(action){
            case ACTION.SIGN_IN:
                packetHeader.requestType = REQUEST_TYPE.AUTH
                break;
            case ACTION.SIGN_OUT:
                packetHeader.requestType = REQUEST_TYPE.AUTH
                break;
            case ACTION.SIGN_UP:
                packetHeader.requestType = REQUEST_TYPE.AUTH
                break;
            case ACTION.FORGET_PASSWORD:
                packetHeader.requestType = REQUEST_TYPE.AUTH
                break;
            case ACTION.SIGN_IN_FB_CODE:
                packetHeader.requestType = REQUEST_TYPE.AUTH
                break;
            
            case ACTION.FETCH_USER_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_MEMBER_ROLES:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.ADD_PRODUCT_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PRODUCT_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_USER_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.ADD_PRODUCT_BID:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PRODUCT_BID_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_USER_PROFILE_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;  
            case ACTION.FETCH_PRODUCT_CATEGORY_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;  
            case ACTION.FETCH_PRODUCT_SIZE_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_PRODUCT_TYPE_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_STAY_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_SMOKING_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_OCCUPATION_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PET_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_LOCATION_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_AMENITY_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_AVAILABILITY_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_TIME_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_CLOSING_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;    
            case ACTION.ADD_SAVED_PRODUCT:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_SAVED_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;   
            case ACTION.SEARCH_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.ADD_PRODUCT_MESSAGE:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.ADD_MESSAGE_BODY:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_MESSAGE_INBOX_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_MESSAGE_SENT_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_MESSAGE_BODY_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_MESSAGE_HEADER:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_USER_ROLES:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_GENDERS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.ADD_PRODUCT_AUTO_BID:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
            case ACTION.FETCH_PRODUCT_AUTO_BID_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_USER_ACCOUNT_SETTINGS_FA:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break; 
                            
            case ACTION.UPDATE_USER_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.UPDATE_USER_PROFILE_PICTURE:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.UPDATE_USER_LOGO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.UPDATE_USER_DOCUMENT:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.UPDATE_PRODUCT_INFO:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.UPDATE_USER_ACCOUNT_SETTINGS_FA:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            case ACTION.UPDATE_AD_BIDS:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
                
            case ACTION.REMOVE_SAVED_PRODUCT:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            
            //Only For Admin
            case ACTION.FETCH_USER_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_PRODUCT_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_LOCATIONS:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.ADD_LOCATION:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_LOCATION_INFO:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            
            case ACTION.UPDATE_LOCATION:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            
            
                
                
                
                
                
                
                
            case ACTION.FETCH_RADIUS_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_GENDER_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_DURATION_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_MIN_PRICE_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_MAX_PRICE_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_ACCOUNT_SETTING_FA:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            case ACTION.FETCH_STAT_LIST:
                packetHeader.requestType = REQUEST_TYPE.REQUEST
                break;
            
            
            
            case ACTION.SAVE_ACCOUNT_SETTING_FA:
                packetHeader.requestType = REQUEST_TYPE.UPDATE
                break;
            default:
                packetHeader.requestType = REQUEST_TYPE.NONE
        }
        return packetHeader;
    }
}
