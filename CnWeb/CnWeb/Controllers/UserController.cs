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
    public class UserController : ControllerBase
    {
        ServiceResult serviceResult = new ServiceResult();
        UserService userService = new UserService();


        [HttpGet("{id}")]
        public IActionResult GetDetail(string id)
        {
            var entities = userService.GetDetail(id);
            //trả về kết quả
            if (entities != null)
                return Ok(entities);
            else
                return BadRequest(entities);
        }


        [HttpPost("login")]
        public IActionResult LoginUser(User user)
        {
            serviceResult = userService.LoginUser(user);
            if (serviceResult.IsValid == true)
            {
                return Ok(serviceResult);
            }
            if (serviceResult.IsValid == false && serviceResult.Message == "Incorrect Username or password")
            {
                return Ok(serviceResult);
            }
            return BadRequest(serviceResult);
        }



        [HttpPost]
        public IActionResult PostUser(User user)
        {
            serviceResult = userService.Insert(user);
            if (serviceResult.IsValid == true)
            {
                return Ok(serviceResult);
            }
            else
            {
                if(serviceResult.Message == "Username exists")
                {
                    return Ok(serviceResult);
                }
                return NoContent();
            }
        }

        [HttpPut("tag")]
        public IActionResult UpdateUserTag(UserTag userTag)
        {
            var row = userService.UpdateUserTag(userTag);
            if (row > 0)
            {
                return Ok();
            } else
            {
                return BadRequest();
            }
        }



        [HttpPut]
        public IActionResult UpdateUser(User user)
        {
            var row = userService.UpdateUser(user);
            if (row > 0)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
