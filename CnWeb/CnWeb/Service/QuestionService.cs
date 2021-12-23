using CnWeb.Model;
using CnWeb.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Service
{
    public class QuestionService
    {
        ServiceResult serviceResult = new ServiceResult();
        public IEnumerable<Question> GetAll(string StringFilter)
        {
            QuestionRepository questionRepository = new QuestionRepository();
            var entities = questionRepository.GetAll(StringFilter);
            //var entities = questionRepository.GetDetail("tan");
            return entities;
        }


        public Question GetDetail(string id, string userId)
        {
            QuestionRepository questionRepository = new QuestionRepository();
            //var entities = questionRepository.GetAll();
            var entities = questionRepository.GetDetail(id, userId);
            return entities;
        }

        public ServiceResult Insert(Question question)
        {
            QuestionRepository questionRepository = new QuestionRepository();
            var rowEntity = questionRepository.Insert(question);
            if (rowEntity > 0)
            {
                serviceResult.IsValid = true;
                serviceResult.Message = "Post Question Success";
            }
            else
            {
                serviceResult.IsValid = false;
                serviceResult.Message = "Post Question Failed";
            }
            return serviceResult;
        }



        public ServiceResult InsertLike(UserQuestion userQuestion)
        {
            QuestionRepository questionRepository = new QuestionRepository();
            var rowEntity = questionRepository.InsertLike(userQuestion);
            if (rowEntity > 0)
            {
                serviceResult.IsValid = true;
                serviceResult.Message = "Post Like Success";
            }
            else
            {
                serviceResult.IsValid = false;
                serviceResult.Message = "Post Like Failed";
            }
            return serviceResult;
        }

        public ServiceResult UpdateQuestion(Question question)
        {
            QuestionRepository questionRepository = new QuestionRepository();
            var rowEntity = questionRepository.UpdateQuestion(question);
            if (rowEntity > 0)
            {
                serviceResult.IsValid = true;
                serviceResult.Message = "Update Question Success";
            }
            else
            {
                serviceResult.IsValid = false;
                serviceResult.Message = "Update Question Failed";
            }
            return serviceResult;
        }




    }
}
