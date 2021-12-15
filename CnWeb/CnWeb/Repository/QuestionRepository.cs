using CnWeb.Model;
using Dapper;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Repository
{
    public class QuestionRepository
    {
        protected IDbConnection _dbConnection;
        string _connectionString;
        public QuestionRepository()
        {
            _connectionString = "Host = localhost;Port = 3306;Database = cnweb_4409;User Id=root;Password = thetan123";
            _dbConnection = new MySqlConnection(_connectionString);
        }
        public IEnumerable<Question> GetAll()
        {
            
            var sqlCommand = "SELECT q.Id,q.Title,q.Content,q.CreateTime,q.ModifyTime, q.View,q.UserId, countanswer.ca AS CountAnswer, u.Name, countlike.cl AS CountVote FROM question q" +
                " LEFT JOIN (SELECT a.QuestionId, COUNT(*) AS ca FROM answer a GROUP BY a.QuestionId) AS countanswer ON countanswer.QuestionId = q.Id" +
                " LEFT JOIN user u ON q.UserId = u.Id" +
                " LEFT JOIN (SELECT uq.QuestionId, COUNT(*) AS cl FROM userquestion uq GROUP BY uq.QuestionId) AS countlike ON countlike.QuestionId = q.Id" +
                " ORDER BY q.CreateTime DESC";
            var entities = _dbConnection.Query<Question>(sqlCommand).ToList();
            foreach (var question in entities)
            {
                var sql = "SELECT t.Id, t.Name FROM questiontag q" +
                "  LEFT JOIN tags t ON q.TagId = t.Id" +
                $"  WHERE q.QuestionId = '{question.Id}'";
                question.Tags = _dbConnection.Query<Tag>(sql).ToList();
            }
            return entities;
        }


        public Question GetDetail(string id, string userId)
        {
            //id = "4db9a514-6d87-2ec1-3b35-0028ed526dd0";
            var sqlUpdateView = $"UPDATE question AS a SET a.View = a.View + 1 WHERE a.Id = '{id}'";
            _dbConnection.Execute(sqlUpdateView);
            // get question
            var sqlCommand = "SELECT q.Id,q.Title,q.Content,q.CreateTime,q.ModifyTime, q.View,countanswer.ca AS CountAnswer, u.Name, countlike.cl AS CountLike FROM question q" +
                " LEFT JOIN (SELECT a.QuestionId, COUNT(*) AS ca FROM answer a GROUP BY a.QuestionId) AS countanswer ON countanswer.QuestionId = q.Id" +
                " LEFT JOIN user u ON q.UserId = u.Id" +
                " LEFT JOIN (SELECT uq.QuestionId, SUM(uq.Status) AS cl FROM userquestion uq GROUP BY uq.QuestionId) AS countlike ON countlike.QuestionId = q.Id" +
                $" WHERE q.Id = '{id}'" +
                " ORDER BY q.CreateTime DESC";



            var entity = _dbConnection.QueryFirstOrDefault<Question>(sqlCommand);
            // get tag
            var sqltag = "SELECT t.Id, t.Name FROM questiontag q" +
                "  LEFT JOIN tags t ON q.TagId = t.Id" +
                $"  WHERE q.QuestionId = '{entity.Id}'";
            entity.Tags = _dbConnection.Query<Tag>(sqltag).ToList();


            // get answer






            var sql = "SELECT a.Id,a.UserId, a.Content,a.CreateTime,a.ModifyTime,countlike.vote AS 'Like', u.Name AS Name FROM answer a" +
                "  LEFT JOIN user u ON a.UserId = u.Id" +
                "  LEFT JOIN (SELECT ua.AnswerId, SUM(ua.Status) AS vote FROM useranswer ua GROUP BY ua.AnswerId) AS countlike ON countlike.AnswerId = a.Id" +
                $"  WHERE a.QuestionId = '{id}'" +
                "  ORDER BY a.CreateTime DESC";
            entity.Answers = _dbConnection.Query<Answer>(sql).ToList();

            var sqlcheck = $"SELECT * FROM userquestion as uq WHERE uq.UserId = '{userId}' AND uq.QuestionId = '{id}'";
            var e2 = _dbConnection.QueryFirstOrDefault<UserQuestion>(sqlcheck);
            if (e2 == null)
            {

                entity.StatusLike = 0;
            } else
            {
                entity.StatusLike = e2.Status;
            }
            if (entity.Answers.Count() > 0)
            {
                foreach (var e in entity.Answers)
                {
                    var sqlcheckanswer = $"SELECT * FROM useranswer as uq WHERE uq.UserId = '{userId}' AND uq.AnswerId = '{e.Id}'";
                    var a2 = _dbConnection.QueryFirstOrDefault<UserAnswer>(sqlcheckanswer);
                    if (a2 == null)
                    {

                        e.StatusLike = 0;
                    }
                    else
                    {
                        e.StatusLike = a2.Status;
                    }
                }
            }
            return entity;
        }

        public int Insert(Question question)
        {
            var rowEntity = 0;
            question.Id = Guid.NewGuid();
            string sql = $"INSERT INTO question (Id, Title, Content, CreateTime, ModifyTime, UserId, View) VALUES ('{question.Id}','{question.Title}', '{question.Content}',NOW(),NOW(),'{question.UserId}' ,0)";
            rowEntity = _dbConnection.Execute(sql);
            foreach (var tag in question.Tags)
            {
                string sqlcmd = $"INSERT INTO questiontag (QuestionId, TagId) VALUES ('{question.Id}','{tag.Id}')";
                rowEntity = _dbConnection.Execute(sqlcmd);
            }
            return rowEntity;
        }

        public int InsertLike(UserQuestion userQuestion)
        {
            var row = 0;
            string sqlDelete = $"DELETE FROM userquestion WHERE UserId = '{userQuestion.UserId}' AND QuestionId='{userQuestion.QuestionId}'";
            var rowEntity = _dbConnection.Execute(sqlDelete);
            if (userQuestion.Status != 0)
            {
               
                string sqlInsert = $"INSERT INTO userquestion (UserId,QuestionId,Status) VALUES ('{userQuestion.UserId}','{userQuestion.QuestionId}', {userQuestion.Status})";
                row = _dbConnection.Execute(sqlInsert);
            } else
            {
                return rowEntity;
            }
            return row;
        }








    }
}
