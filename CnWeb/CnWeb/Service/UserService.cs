using CnWeb.Model;
using CnWeb.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CnWeb.Service
{
    public class UserService
    {
        ServiceResult serviceResult = new ServiceResult();

        public ServiceResult LoginUser(User user)
        {
            UserRepository userRepository = new UserRepository();
            serviceResult.IsValid = false;
            serviceResult.Message = "Incorrect Username or password";
            var entity = userRepository.GetByName(user);
            if (entity!= null)
            {
                var pass = EncodePassword(user.Password);
                if(pass == entity.Password)
                {
                    
                    serviceResult.IsValid = true;
                    serviceResult.Message = $"{entity.Id}";
                    
                    serviceResult.Tags = userRepository.GetTagUser(entity.Id.ToString());
                    // get tag
                }
            }
            return serviceResult;
        }



        public ServiceResult Insert(User user)
        {
            UserRepository userRepository = new UserRepository();
            var rowEntity = 0;
            var checkExist = CheckExistUser(user);
            serviceResult.IsValid = false;
            serviceResult.Message = "Username exists";
            if (checkExist == false)
            {
                serviceResult.Message = "Sign up success";
                rowEntity = userRepository.Insert(user);
                if (rowEntity == 1)
                {
                    serviceResult.IsValid = true;
                }
            }
            return serviceResult;
        }


        public int UpdateUserTag(UserTag userTag)
        {
            UserRepository userRepository = new UserRepository();
            var row = userRepository.UpdateUserTag(userTag);
            return row;
        }


        public int UpdateUser(User user)
        {
            UserRepository userRepository = new UserRepository();
            var row = userRepository.UpdateUser(user);
            return row;
        }



        public User GetDetail(string id)
        {
            UserRepository userRepository = new UserRepository();
            //var entities = questionRepository.GetAll();
            var entities = userRepository.GetDetail(id);
            return entities;
        }


        public bool CheckExistUser(User user)
        {
            UserRepository userRepository = new UserRepository();
            var entity = userRepository.GetByName(user);
            if (entity != null)
            {
                return true;
            } else
            {
                return false;
            }
        }

        public string EncodePassword(string originalPassword)
        {
            Byte[] originalBytes;
            Byte[] encodedBytes;
            MD5 md5;
            md5 = new MD5CryptoServiceProvider();
            originalBytes = ASCIIEncoding.Default.GetBytes(originalPassword);
            encodedBytes = md5.ComputeHash(originalBytes);
            return BitConverter.ToString(encodedBytes);
        }

    }
}
