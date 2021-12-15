using CnWeb.Model;
using CnWeb.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Service
{
    public class AnswerService
    {
        ServiceResult serviceResult = new ServiceResult();
        public ServiceResult Insert(Answer answer)
        {
            AnswerRepository answerRepository = new AnswerRepository();
            var rowEntity = answerRepository.Insert(answer);
            if (rowEntity>0)
            {
                serviceResult.IsValid = true;
                serviceResult.Message = "Post Answer Success";
            } else
            {
                serviceResult.IsValid = false;
                serviceResult.Message = "Post Answer Failed";
            }
            return serviceResult;
        }

        public ServiceResult InsertLike(UserAnswer userAnswer)
        {
            AnswerRepository answerRepository = new AnswerRepository();
            var rowEntity = answerRepository.InsertLike(userAnswer);
            if (rowEntity > 0)
            {
                serviceResult.IsValid = true;
                serviceResult.Message = "Post Like Answer Success";
            }
            else
            {
                serviceResult.IsValid = false;
                serviceResult.Message = "Post Like Answer Failed";
            }
            return serviceResult;
        }


        public ServiceResult UpdateAnswer(Answer answer)
        {
            AnswerRepository answerRepository = new AnswerRepository();
            var rowEntity = answerRepository.UpdateAnswer(answer);
            if (rowEntity > 0)
            {
                serviceResult.IsValid = true;
                serviceResult.Message = "Update Answer Success";
            }
            else
            {
                serviceResult.IsValid = false;
                serviceResult.Message = "Update Answer Failed";
            }
            return serviceResult;
        }


        public ServiceResult DeleteAnswer(string id)
        {
            AnswerRepository answerRepository = new AnswerRepository();
            var rowEntity = answerRepository.DeleteAnswer(id);
            if (rowEntity > 0)
            {
                serviceResult.IsValid = true;
                serviceResult.Message = "Delete Answer Success";
            }
            else
            {
                serviceResult.IsValid = false;
                serviceResult.Message = "Delete Answer Failed";
            }
            return serviceResult;
        }




    }
}
