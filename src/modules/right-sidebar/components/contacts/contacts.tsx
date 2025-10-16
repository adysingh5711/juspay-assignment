import { Heading } from "../heading"
import { ContactsData } from "../../data/contacts.data"
import { ContactItem } from "./contacts-item"
import { motion } from "framer-motion"

export const Contacts = () => {
    return(
        <div className="flex flex-col gap-2">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Heading title="Contacts" />
            </motion.div>
            <div className="flex flex-col gap-2">
                {ContactsData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                        <ContactItem item={item} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}