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
    public class AnswerRepository
    {

        protected IDbConnection _dbConnection;
        string _connectionString;
        public AnswerRepository()
        {
            _connectionString = "Host = localhost;Port = 3306;Database = cnweb_4409;User Id=root;Password = thetan123";
            _dbConnection = new MySqlConnection(_connectionString);
        }
        public int Insert(Answer answer)
        {
            var rowEntity = 0;
            answer.Id = Guid.NewGuid();
            string sql = $"INSERT INTO answer (Id, Content, CreateTime, ModifyTime, UserId, QuestionId) VALUES ('{answer.Id}','{answer.Content}',NOW(),NOW(),'{answer.UserId}','{answer.QuestionId}')";
            rowEntity = _dbConnection.Execute(sql);
            return rowEntity;
        }

        public int InsertLike(UserAnswer userAnswer)
        {
            var row = 0;
            string sqlDelete = $"DELETE FROM useranswer WHERE UserId = '{userAnswer.UserId}' AND AnswerId='{userAnswer.AnswerId}'";
            var rowEntity = _dbConnection.Execute(sqlDelete);
            if (userAnswer.Status != 0)
            {

                string sqlInsert = $"INSERT INTO useranswer (UserId,AnswerId,Status) VALUES ('{userAnswer.UserId}','{userAnswer.AnswerId}', {userAnswer.Status})";
                row = _dbConnection.Execute(sqlInsert);
            }
            else
            {
                return rowEntity;
            }
            return row;
        }


        public int UpdateAnswer(Answer answer)
        {
            var row = 0;
            var sql = $"UPDATE ANSWER SET Content = '{answer.Content}', ModifyTime = Now() WHERE Id = '{answer.Id}'";
            row = _dbConnection.Execute(sql);
            return row;
        }


        public int DeleteAnswer(string id)
        {
            var row = 0;
            string sql = $"DELETE FROM answer WHERE Id = '{id}'";
            row = _dbConnection.Execute(sql);
            return row;

        }





    }
}
