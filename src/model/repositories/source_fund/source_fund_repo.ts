import { Model } from "mongoose"
import { SourceFundType, Transaction } from "../../dtos/dto"

export interface SourceFundRepository {
    getSourceFund(id:string):Promise<SourceFundType | null>
    getSourceFunds(userId:string):Promise<SourceFundType[] | null>
    deleteSourceFund(id:string):Promise<boolean>
    addSourceFund(sourceFund:SourceFundType):Promise<boolean>
    updateSourceFund(sourceFund:SourceFundType):Promise<boolean|null>
    deleteSourceFundInBatch(sourceFund:SourceFundType[]):Promise<boolean>
    search(value:string,userId:string):Promise<SourceFundType[]>
}

export class SourceFundRepositoryImpl implements SourceFundRepository{
    private sourceFundModel:Model<SourceFundType>
    constructor(model:Model<SourceFundType>){
        this.sourceFundModel = model
    }
    async search(value: string, userId: string): Promise<SourceFundType[]> {
        const regex = new RegExp(value,"i")
        try{
            const sourceFunds = await this.sourceFundModel.find({
                "user._id":userId,
                $or:
                   [{ 
                    name:{
                        "$regex":regex
                    }
                }]
                
            })
            return sourceFunds
            
        }
        catch(e:any){
            console.error(e)
            return []
        }
    }
    async deleteSourceFundInBatch(sourceFund: SourceFundType[]): Promise<boolean> {
        try{
            const deletePromise = sourceFund.map(async (sourceFundItem)=>
            {
               await this.sourceFundModel.deleteOne({_id:sourceFundItem._id})

            })
            await Promise.all(deletePromise)
            
            return true

        }catch(e:any){
            console.log(e)
            return false
        }
        
    }
    
    async getSourceFund(id: string): Promise<SourceFundType| null> {
        try{
            return await this.sourceFundModel.findOne({_id:id})

        }catch(e:any){
            console.log(e)
            return null
        }
    }
    async getSourceFunds(userId: string): Promise<SourceFundType[] | null> {
        try{
            return await this.sourceFundModel.find({"user._id":userId})

        }catch(e:any){
            console.log(e)
            return null
        }
    }
    async deleteSourceFund(userId: string): Promise<boolean> {
        try{
            const deleteResult = await this.sourceFundModel.deleteOne({_id:userId})
            return deleteResult.acknowledged

        }catch(e:any){
            console.log(e)
            return false
        }
    }
    async addSourceFund(sourceFund: SourceFundType): Promise<boolean> {
        try{
          await this.sourceFundModel.create(sourceFund)
          return true

        }catch(e:any){
            console.log(e)
            return false
        }
    }
    async updateSourceFund(sourceFund: SourceFundType): Promise<boolean> {
        try{
            await this.sourceFundModel.updateOne({_id:sourceFund._id},sourceFund)
            return true
  
          }catch(e:any){
              console.log(e)
              return false
          }
        
    }

}