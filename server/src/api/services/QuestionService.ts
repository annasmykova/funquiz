import {AppDataSource} from "../../db/data-source";
import {Question} from "../../db/entities/Question";

class QuestionService {
  repository = AppDataSource.getRepository(Question)

  async getQuestions() {
    return this.repository.find({ order: { id: 'asc' } })
  }

}

export default new QuestionService()
