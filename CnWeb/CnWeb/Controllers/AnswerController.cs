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
    public class AnswerController : ControllerBase
    {
        ServiceResult serviceResult = new ServiceResult();
        AnswerService answerService = new AnswerService();
        [HttpPost]
        public IActionResult PostUser(Answer answer)
        {
            serviceResult = answerService.Insert(answer);
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
        public IActionResult UpdateAnswer(Answer answer)
        {
            serviceResult = answerService.UpdateAnswer(answer);
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
        public IActionResult PostLike(UserAnswer userAnswer)
        {
            serviceResult = answerService.InsertLike(userAnswer);
            if (serviceResult.IsValid == true)
            {
                return Ok(serviceResult);
            }
            else
            {
                return BadRequest(serviceResult);
            }
        }



        [HttpDelete("{id}")]
        public IActionResult DeleteAnswer(string id)
        {
            serviceResult = answerService.DeleteAnswer(id);
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
