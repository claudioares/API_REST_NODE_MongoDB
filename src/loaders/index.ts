import startDB from './mongodb';


class Loaders {
    start(){
        startDB()
    }
}

export default new Loaders;