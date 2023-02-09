import mongoose,{Schema,model,Document} from "mongoose"
import * as bcrypt from 'bcryptjs'
import validator from 'validator'
const SALT_WORK_FACTOR = 10;

export interface IUser extends Document{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    type:'client' | 'admin';
    validatePassword(password:string):boolean;
    validateEmail(email:string):boolean;
    fullName():string;
}



const UserSchema=new Schema({
    email:{
        type:String,
        trim: true,
        unique:true,
        lowercase: true,
        required:[true,"Email is a required field"],
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Please enter a valid E-mail!");
              }
        } 
    },
    firstName:{
        type:String,
        max:[50,'Max of 50, got {VALUE}'],
        required:true
    },
    lastName:{
        type:String,
        max:[50,'Max of 50, got {VALUE}'],
        required:true
    },
    password:{
        type:String,
        required:true,
        default:'',
        validate:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
        "Password must have minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"]
    },
    type:{
        type:String,
        default:'client',
        enum:{
            values:['client', 'admin'],
            message: '{VALUE} is not supported'
        }
    }
},{
    timestamps:true
})

UserSchema.path("email").validate(async(email)=>{
    const emailCount= await mongoose.models.User.countDocuments({email})
    return !emailCount
}, "Email already exists")

UserSchema.pre('save', async function save(next){
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
        return next();
    }catch(e){
        return next(e);
    }
})

UserSchema.methods.validatePassword = async function (pass:string){
    return bcrypt.compare(pass, this.password)
}

UserSchema.methods.fullName= function ():string{
    return this.firstName + " " + this.lastName
}


export default model<IUser>("User", UserSchema)