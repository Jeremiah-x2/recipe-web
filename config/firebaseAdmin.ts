import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.app.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail:
        "firebase-adminsdk-1hwiy@recipes-b4425.iam.gserviceaccount.com",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCk7yRPP/Od1fGK\n9xunbDbgt+9Tz6uNciuOzOl1d17VjNGnDJPyMMe1QWlwoj1X2Z6vekBLrBs2+Cml\nc/ju7Us4rQWWQxsBnRnQsbxR0ITTpc8DZfLBVDIiZbm5lGu7SgO3usQWifrtwFxv\n4UOB3jxKccPIUU8BWdZu6N1faabLGHCK8/23BBWOC64WkR0xMp17L4DaMUMVRzxE\nCY/ly/t5lTG5rB9HfdhDpggGd15HmiNqKaTvtn4qGAv3Avc+2uvt+Wb/HUdG2+o/\nHXtGxggXc/zxTBX9k6SJqIm2oW2XJ+UJQcicxpI/AJnlIn9ATzNt2wrt5UrMUXfF\n++GOogq9AgMBAAECggEAAJo+IcJYdPuPDNR//ZbPHLGt3aNJWKXjKx7JVHORrs0H\nBzg9f2Pzl4qB8yT5q/ATcTBj6Xc4Qmm9B8Eb7esmRPg7v33SQ9gETYjSIxEaQalP\noPfGyEqnT6+sz2wmyd70Hp0z6Vvk3F0HHzyZHCAGBqH1H3RwlZToBk/Ju/cV+cLz\norlYFR7dOP/2JumEnKhDCYGovVv3dZKNVU2OZgNi+bZ6HBA8UzjwEIqpC6sw0pVK\nmVqPP+qlQHK+ehbyrHb1ojx9rDR2INOnzBxfh1sCTbgek+UHxuJJRnkAlAT/a8Gy\nQc6KrqvhUQHE0+c7ZvybrrO6tjP1oRke2PnS9RTTrwKBgQDaOy1N+QK0VHjSE+qb\nevXVNS19SGPNbKuZCbDsEHHgMdcPEioxKfZg30jHpDBYdbclkatJWCKwDDDqsmee\nqzwoAkeYpFzGIj2KL8Vin1kM44Nv/BZZ9IBuDY7As32KjHB1UtObYgywkROjoFW5\nGPXiVNJQBA2Y3D1e0sORM4VJrwKBgQDBep5PAihJBPsl7VNd/plDZLXhCmmslqkn\nPzpKLlVnbzY7i5RfjfZE9mxfFyANG/vgbjhnCicwPw49S9UAQimSYLK6zO0n7+tt\nMKZ98cASGDhcuiMU1JAzAAIb6IVaoOzKHRqWqu+Nz8Koj31eJivWIws0NJuOZRgX\nrjZke2wJUwKBgQDHCaQXcp6Z1FVh3VJjvnEKpXa4xlZoXM3hRap8k78Y6Lwp/bpH\nnuscjWm21DRX6f1BoatkuKLiiCvxUwgY+jpijzm3qWkIOOCB8XIIsicpDzSo5XWJ\nU+vy9CCX9tzwiYhkKUfgdzv1qkwMN8cXjAFvDUfIPPodyfmbS4WdIC1X9wKBgH03\nzaNWwxnXBnAac90efLS4RloaMiBH9bv32NLPv+hMeq34/RMGvr8NOUAlqFGzrcUn\nsItHb+tys9WJ8ZXUPDGHMcViAY7aYOTvGqHiRyuuzzN8KF4/3/+R3suPJldsVTPN\nuDqQ8K84KkSLcVjwnWhej86+yXpUBU62Km/HzTkPAoGBAICo65+5+n8roegZT+qb\n38HOUEOizdoThj7tC069pRvm/xsrgPmqFU/5OlB8mm9B41GWwqJPLR5pECc4w9Lh\nvI7NoE7zkZgri8AB62XVkeqzQxISAln3Y/Nb36fMUqMH1n55DxV6aXvQ+YQmyWNC\nGT0VN7VOB9LL2jODAP40iIq/\n-----END PRIVATE KEY-----\n",
      projectId: "recipes-b4425",
    }),
  });
}

export default admin;
export const adminAuth = admin.auth();
export const adminDB = getFirestore();
