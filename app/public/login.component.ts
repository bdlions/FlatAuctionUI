import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import {Subscription} from 'rxjs';
import {EntityRole} from './../dto/EntityRole';
import {WebAPIService} from './../webservice/web-api-service';
import {PacketHeaderFactory} from './../webservice/PacketHeaderFactory';
import {ACTION} from './../webservice/ACTION';


@Component({
    selector: 'app',
    templateUrl: 'app/html/public/login.component.html',
    providers: [WebAPIService]
})

export class LoginComponent {
    private webAPIService: WebAPIService;
    private errorMsg:string;
    private msg:string;
    private subscribe: Subscription;
    
    constructor(public router: Router, public route: ActivatedRoute, public http: Http, webAPIService: WebAPIService) {
        this.webAPIService = webAPIService;
        
        let msg = localStorage.getItem("msg");
        if (msg != null && msg != "")
        {
            this.msg = msg;
            localStorage.removeItem("msg");
        }
        
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        
        if (username != null && username != "" && password != null && password != ""){
            this.loginUser(username,password);
        }
    }
    
    ngOnInit() 
    {
        this.subscribe = this.route.params.subscribe(params => {
            let id: number = params['id']; 
            if(id != null && id == 1)
            {
                this.msg = "Congratulation! You have activated your account. Please login to your account.";
            }
            if(id != null && id == 2)
            {
                this.errorMsg = "Invalid code to activate your account.";
            }
            
        });
    }
  
    login(event: Event, username: string, password: string) {
        if (username == null || username == "")
        {
            this.errorMsg = "Email is required.";
            return;
        }
        if (password == null || password == "")
        {
            this.errorMsg = "Password is required.";
        }
        event.preventDefault();
        this.loginUser(username, password);
    }
    
    loginUser(username:string, password:string){
        let requestBody: string = "{\"userName\": \"" + username + "\", \"password\": \"" + password+"\"}";
        
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.SIGN_IN), requestBody).then(result =>{
            if (result != null && result.success){
                if (result.sessionId != null && result.sessionId != ""){
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    localStorage.setItem("sessionId", result.sessionId);
                    
                    this.fetchUserRoles();
                    //window.location.replace("/");
                    //window.location.href = "member.html";
                }
                else{
                    localStorage.removeItem("sessionId");
                    this.errorMsg = "Invalid session.";
                }
            }
            else if (result != null && !result.success)
            {
                this.errorMsg = result.message;
            }
            else
            {
                this.errorMsg = "Server is unavailable. Please try again later.";
            }
        });       
        
    }
    
    fetchUserRoles()
    {
        let isAdmin: boolean;
        this.webAPIService.getResponse(PacketHeaderFactory.getHeader(ACTION.FETCH_USER_ROLES), "{}").then(result => {
            if (result != null && result.success)
            {
                let roles: EntityRole[] = result.list;
                if (roles != null && roles.length > 0)
                {
                    for (let counter = 0; counter < roles.length; counter++)
                    {
                        if (roles[counter].id == 1)
                        {
                            //admin has role id 1
                            isAdmin = true;
                        }
                    }
                }  
                if (isAdmin)
                {
                    window.location.replace("/");
                    window.location.href = "admin.html";
                }   
                else
                {
                    window.location.replace("/");
                    window.location.href = "member.html";
                }           
            }            
        });
    }
    
    goForgetPassword(event: Event) 
    {
        event.preventDefault();
        this.router.navigate(["forgetpassword"]);
    }
}



