using CnWeb.Model;
using CnWeb.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        QuestionService questionService = new QuestionService();
        ServiceResult serviceResult = new ServiceResult();
        [HttpGet]
        public IActionResult GetAll(string StringFilter)
        {
            var entities = questionService.GetAll(StringFilter);
            //trả về kết quả
            if (entities.Count() > 0)
            {
                return Ok(entities);
            } 
            else
            {
               return NoContent();
            }
        }

        [HttpGet("{id}/{userId}")]
        public IActionResult GetDetail(string id, string userId)
        {
            var entities = questionService.GetDetail(id, userId);
            //trả về kết quả
            if (entities != null)
                return Ok(entities);
            else
                return BadRequest();
        }
        [HttpPost]
        public IActionResult PostQuestion(Question question)
        {
            serviceResult = questionService.Insert(question);
            if (serviceResult.IsValid == true)
            {
                return Ok(serviceResult);
            }
            else
            {
                return BadRequest(serviceResult);
            }
        }

        [HttpPut]
        public IActionResult UpdateQuestion(Question question)
        {
            serviceResult = questionService.UpdateQuestion(question);
            if (serviceResult.IsValid == true)
            {
                return Ok(serviceResult);
            }
            else
            {
                return BadRequest(serviceResult);
            }
        }

        [HttpPut("like")]
        public IActionResult PostLike(UserQuestion userQuestion)
        {
            serviceResult = questionService.InsertLike(userQuestion);
            if (serviceResult.IsValid == true)
            {
                return Ok(serviceResult);
            }
            else
            {
                return BadRequest(serviceResult);
            }
        }
    }
}
