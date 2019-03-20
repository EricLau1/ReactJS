const generateId = () => Math.floor(Math.random() * 10000);

export class CustomerService {

    static create = (customer) => {
        const id = generateId();
        const createdAt = new Date().getTime();
        const updatedAt = new Date().getTime();
        return { ...customer, id, createdAt, updatedAt };
    }

    static sort = (orderBy, a, b) => {
        switch(orderBy) {
            case 'desc':
                return a.name.localeCompare(b.name) * -1; // lista ao contrário
            case 'createdAt':
                return new Date(a.createdAt) - new Date(b.createdAt);
            default:
                return a.name.localeCompare(b.name);
        }
    }
    
    static search = ({name, phone, email, cpf}, searchBy) => {
        if(!searchBy) return true;
        const items = [name, phone, email, cpf].join(';');
        return items.includes(searchBy);
    }
}