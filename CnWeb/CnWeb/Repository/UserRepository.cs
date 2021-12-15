using CnWeb.Model;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

namespace CnWeb.Repository
{
    public class UserRepository
    {
        protected IDbConnection _dbConnection;
        string _connectionString;
        IConfiguration _configuration;
        public UserRepository()
        {
            _connectionString = "Host = localhost;Port = 3306;Database = cnweb_4409;User Id=root;Password = thetan123";
            _dbConnection = new MySqlConnection(_connectionString);
        }
        public int Insert(User user)
        {
            var rowEntity = 0;
            user.Id = Guid.NewGuid();
            user.Password = EncodePassword(user.Password);
            string sql = $"INSERT INTO user (Id, Username, Password, Description, Favorite, Star, Name) VALUES ('{user.Id}','{user.Username}','{user.Password}','{user.Description}','{user.Favorite}','{user.Star}','{user.Name}')";
            rowEntity = _dbConnection.Execute(sql);
            return rowEntity;
        }
        public User GetByName(User user)
        {
            //DynamicParameters parameters = new DynamicParameters();
            //parameters.Add("@Username", user.Username);
            var sqlCommand = $"SELECT * FROM User WHERE Username = '{user.Username}'";
            var entity = _dbConnection.QueryFirstOrDefault<User>(sqlCommand);
            return entity;
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


        public User GetDetail(string id)
        {
            var sql = "SELECT u.Name, u.Id, u.Username, u.Description, ua.countanswer, uq.countquestion FROM user u " +
                "  LEFT JOIN (SELECT COUNT(*) AS countanswer, a.UserId AS Idd FROM answer a GROUP BY a.UserId) AS ua ON ua.Idd = u.Id" +
                "  LEFT JOIN (SELECT COUNT(*) AS countquestion, q.UserId AS Idd FROM question q GROUP BY q.UserId) AS uq ON uq.Idd = u.Id" +
                $"   WHERE u.Id = '{id}'";
            var entity = _dbConnection.QueryFirstOrDefault<User>(sql);

            var sqlTag = "SELECT t.Id,t.Name FROM usertag u " +
                "  LEFT JOIN tags t ON u.TagId = t.Id" +
                $"  WHERE u.UserId = '{id}'";
            entity.Tags = _dbConnection.Query<Tag>(sqlTag).ToList();
            return entity;
        }

        public List<Tag> GetTagUser(string id)
        {
            var sql = "SELECT t.Id, t.Name FROM usertag u" +
                "  LEFT JOIN tags t ON u.TagId = t.Id" +
                $"  WHERE u.UserId = '{id}'";
            var entites = _dbConnection.Query<Tag>(sql).ToList();
            return entites;
        }


        public int UpdateUserTag(UserTag userTag)
        {
            var row = 0;
            string sqlDelete = $"DELETE FROM usertag WHERE UserId = '{userTag.UserId}'";
            var rowEntity = _dbConnection.Execute(sqlDelete);
            foreach (var tag in userTag.Tags)
            {
                string sqlUpdate = $"INSERT INTO usertag (UserId, TagId) VALUES ('{userTag.UserId}', '{tag.Id}')";
                row = _dbConnection.Execute(sqlUpdate);
            }
            
            return row + rowEntity;
        }

        public int UpdateUser(User user)
        {
            var row = 0;
            string sql = $"UPDATE User SET Name = '{user.Name}', Description = '{user.Description}' WHERE Id = '{user.Id}'";
            row = _dbConnection.Execute(sql);
            UserTag userTag = new UserTag();
            userTag.UserId = user.Id;
            userTag.Tags = user.Tags;
            row += UpdateUserTag(userTag);
            return row;
        }





        public DynamicParameters MappingDbType(User user)
        {
            var properties = user.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(user);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }
            return parameters;
        }
    }
}
